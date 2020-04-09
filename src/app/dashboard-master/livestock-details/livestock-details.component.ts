import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'
import { ColDef } from 'ag-grid-community';
import { ILivestockData } from '../../models/livestockData';
import * as _ from 'lodash';
// import { uid } from 'uid';
import uid from 'uid';
import { Livestock, ParamsCreateLivestock } from './../grphql/interface/livestockInterface';
// service
import { MasterfileService } from './../../services/graphql/masterfile.service'
import { ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-livestock-details',
  templateUrl: './livestock-details.component.html',
  styleUrls: ['./livestock-details.component.scss']
})
export class LivestockDetailsComponent implements OnInit {


  @ViewChild('name', { static: false }) inputField: ElementRef
  // variable declaration
  frameworkComponents: any;
  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  rowData: Livestock[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private rowLength: number;
  private editBtnClicked: boolean = false;


  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  // private rowId: uid();

  constructor(
    private fb: FormBuilder,
    private dataService: MasterfileService,
    private toasterService: ToasterService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';
    this.isEditMode = false;
    this.showUniqueErr = false;
    this.rowLength = 0;

    this.rowData = [
      {
        id: "",
        livestockName: '',
        editMode: "",
        breedCount: 0
      }
    ];
  }

  ngOnInit() {
    this.dataService.findAll().subscribe(
      result => {
        this.rowData = result.FindAllLivestock
        this.rowLength = this.rowData.length
      }
    )
  }

  // ========= livestock form group ===========
  lsDetailsForm = this.fb.group({
    lsName: ["", Validators.required]
  });


  //  ========= coloum defenition =============
  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true
    },
    {
      headerName: 'Livestock Name',
      field: 'livestockName',
      width: 300,
      sortable: true
    },
    {
      headerName: "Breed(s)",
      field: 'breedCount',
      width: 100
    },
    {
      headerName: 'Action',
      field: 'editmode',
      width: 200,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      }
    }
  ];

  getRowData() {
    var rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // ======== check unique ============
  isUnique(selectedValue: string): boolean {
    const findedValue = this.rowData.findIndex((obj: Livestock) => {
      return obj.livestockName === selectedValue;
    });
    return findedValue === -1 ? true : false;
  }

  // ====update livestock =====
  UpdateLivestock(rowIndex) {
    let livestockName = _.upperFirst(this.lsDetailsForm.value.lsName);

    this.dataService.create({ livestockName }).subscribe(
      res => {
        if (rowIndex === 0) {
          this.rowData[rowIndex] = res.CreateLivestock
        } else {
          this.rowData = [...this.rowData, res.CreateLivestock]
        }
        
        let lastIndex= _.lastIndexOf(this.rowData, this.rowData[rowIndex] )
        let current = this.gridApi.getRowNode(lastIndex)
        console.log(current)
        // console.log(this.rowData);
        // console.log(lastIndex);
        this.rowLength = this.rowData.length;

        this.gridApi.setRowData(this.rowData);
        this.gridApi.ensureIndexVisible(lastIndex, 'bottom');
      },

      err => {
        this.toasterService.pop("error", "Server Error", err)
      }

    )
  }

  // ====edit livestock =====
  EditLivestock(rowIndex: number) {
    let livestockName = _.upperFirst(this.lsDetailsForm.value.lsName);
    let livestockId = this.rowData[rowIndex].id
    this.dataService.edit({ livestockId, livestockName }).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditLivestock;
        let currentRow = this.gridApi.getRowNode(rowIndex);
        currentRow.setDataValue("livestockName", _.upperFirst(livestockName));
      },
      err => {
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  }

  // ====== Delete Livestock ======

  DeleteLivestock( rowIndex ) {
    let livestockId = this.rowData[rowIndex].id
    this.dataService.delete({livestockId}).subscribe(
      res => {
        this.rowData[rowIndex] = res.DeleteLivestock
        this.rowData = this.rowData.filter((data) => {
              return data.livestockName !== res.DeleteLivestock.livestockName
            });
      }
    )
  }

  // ========= onSubmit ===========
  onSubmit(LsDirective: FormGroupDirective) {

    const livestockName = _.upperFirst(this.lsDetailsForm.value.lsName);
    if (this.lsDetailsForm.valid) {

      if (this.isUnique(livestockName)) {
        this.showUniqueErr = false;
        if (this.isEditMode) {
          //==== edit mode action ====
          console.log(this.editRecordId);
          const index = _.findIndex(this.rowData, (obj) => {
            return obj.id === this.editRecordId;
          })
          this.EditLivestock(index);


          let currentRow = this.gridApi.getRowNode(index);
          // console.log(currentRow);
          currentRow.setDataValue("livestockName", _.upperFirst(livestockName));
          // LsDirective.resetForm()
          // this.lsDetailsForm.reset();

        } else {
          // ==== new mode acton ====
          let rowLength = this.rowData.length;

          if (rowLength === 1 && this.rowData[0].livestockName === '') {
            // ======= updating the first record ======
            let currentRow = this.gridApi.getRowNode(0);
            // currentRow.setDataValue("livestockName", _.upperFirst(livestockName));
            this.UpdateLivestock(currentRow);

          } else {
            // ====== new record ===========
            // let newItem = this.createNewRowData();
            // newItem.livestockName = _.upperFirst(livestockName);
            // this.gridApi.updateRowData({ add: [newItem] });
            // this.rowData.push(newItem)
            this.UpdateLivestock(-1)
            // this.gridApi.updateRowData({ add: [res.CreateLivestock] });
            let data = this.gridApi.gridOptionsWrapper.gridOptions.rowData;
            let currentRow = _.last(data);
            // let currentRow = this.gridApi.getRowNode(temIndex);
            // let currentRow =_.findIndex(this.rowData );
            // console.log(data);
            // console.log(currentRow);

          }

        }
      } else {
        this.showUniqueErr = true;
        console.log(this.showUniqueErr);
      }
    }



    this.isEditMode = false;
    // LsDirective.resetForm()
    this.lsDetailsForm.reset();
   
    this.rowLength = this.rowData.length

  }

  // ====== rowdata ===============



  // onClickedOutside(e) {
  //   console.log(e)
  //   if (this.editBtnClicked === false) {
  //     console.log(this.editBtnClicked)
  //     e.invalid = true;
  //   }else{
  //     console.log(this.editBtnClicked)
  //     this.editBtnClicked ? false : true;
  //   }

  //   // e.this.lsDetailsForm.clearValidators();
  // }

  // ====== Edit data ===================
  onEdit(editData: ILivestockData): void {

    this.isEditMode = true;
    this.editRecordId = editData.id;
    this.lsDetailsForm.get('lsName').setValue(editData.livestockName);
    this.editBtnClicked = true;
    // let selectedData = this.gridApi.getSelectedRows();
    // console.log(selectedData);
    // console.log("edit", editData);
    this.inputField.nativeElement.focus();



  }


  //  ========= Delete data ===============
  onDelete(deleteData: ILivestockData): void {
    const deleteIndex = _.findIndex(this.rowData, (obj) => {
      return obj.id === deleteData.id;
    })
    // console.log(deleteIndex);
    // let selectedRow = this.gridApi.getRowNode(deleteIndex)
    // console.log("delete", selectedRow);
    this.DeleteLivestock(deleteIndex);

    // if (this.rowData.length === 1) {
    //   selectedRow.setDataValue("livestockName", "");
    // } else {

    //   this.rowData = this.rowData.filter((data) => {
    //     return data.livestockName !== deleteData.livestockName
    //   });
    // }
    // console.log("delete", this.rowData);

    this.rowLength = this.rowData.length
  }

  createNewRowData() {
    let newData = {
      id: "",
      livestockName: '',
      editMode: '',
      breedCount: 0

    };
    return newData;
  }

}



