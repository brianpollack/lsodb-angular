import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'
import { ColDef } from 'ag-grid-community';
import { ILivestockData } from '../../models/livestockData';
import * as _ from 'lodash';
// import { uid } from 'uid';
import uid from 'uid';

@Component({
  selector: 'app-livestock-details',
  templateUrl: './livestock-details.component.html',
  styleUrls: ['./livestock-details.component.scss']
})
export class LivestockDetailsComponent implements OnInit {
  

  // variable declaration
  frameworkComponents: any;
  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  rowData: ILivestockData[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private rowLength: number;

  // private rowId: uid();

  constructor(
    private fb: FormBuilder
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';
    this.isEditMode = false;
    this.showUniqueErr = false;
    this.rowLength = 0;

    this.rowData = [
      { id: uid(), livestockName: '', editmode: "" }
    ];
  }

  ngOnInit() {
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
    const findedValue = this.rowData.findIndex((obj: ILivestockData) => {
      return obj.livestockName === selectedValue;
    });
    return findedValue === -1 ? true : false;
  }

  // ========= onSubmit ===========
  onSubmit(LsDirective: FormGroupDirective) {

    const livestockName =  _.upperFirst(this.lsDetailsForm.value.lsName);
    if (this.lsDetailsForm.valid) {

      if (this.isUnique(livestockName)) {
        this.showUniqueErr = false;
        if (this.isEditMode) {
          //==== edit mode action ====
          console.log(this.editRecordId);
          const index = _.findIndex(this.rowData, (obj) => {
            return obj.id === this.editRecordId;
          })
          let currentRow = this.gridApi.getRowNode(index);
          console.log(currentRow);
          currentRow.setDataValue("livestockName",_.upperFirst(livestockName));
          // LsDirective.resetForm()
          // this.lsDetailsForm.reset();

        } else {
          // ==== new mode acton ====
          let rowLength = this.rowData.length;

          if (rowLength === 1 && this.rowData[0].livestockName === '') {
            // ======= updating the first record ======
            let currentRow = this.gridApi.getRowNode(0);
            currentRow.setDataValue("livestockName",_.upperFirst( livestockName));
            
          } else {
            // ====== new record ===========
            let newItem = this.createNewRowData();
            newItem.livestockName = _.upperFirst(livestockName);
            this.gridApi.updateRowData({ add: [newItem] });
            this.rowData.push(newItem)
           
            
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
    console.log(this.rowData);
    this.rowLength = this.rowData.length

  }

  // ====== rowdata ===============

  @ViewChild('name') inputField : ElementRef
  // ====== Edit data ===================
  onEdit(editData: ILivestockData): void {

    this.isEditMode = true;
    this.editRecordId = editData.id;
    this.lsDetailsForm.get('lsName').setValue(editData.livestockName);
    // let selectedData = this.gridApi.getSelectedRows();
    // console.log(selectedData);
    console.log("edit", editData);
    this.inputField.nativeElement.focus();
    


  }


  //  ========= Delete data ===============
  onDelete(deleteData: ILivestockData): void {
    const deleteIndex = _.findIndex(this.rowData, (obj) => {
      return obj.id === deleteData.id;
    })
    let selectedRow = this.gridApi.getRowNode(deleteIndex)
    console.log("delete", selectedRow);

    if (this.rowData.length === 1) {
      selectedRow.setDataValue("livestockName", "");
    } else {

      this.rowData = this.rowData.filter((data) => {
        return data.livestockName !== deleteData.livestockName
      });
    }
    console.log("delete", this.rowData);

    this.rowLength = this.rowData.length
  }

  createNewRowData() {
    let newData = {
      id: uid(),
      livestockName: '',
      editmode: ''
    };
    return newData;
  }

}



