import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'
import { ColDef } from 'ag-grid-community';
import { IbreedData } from '../../models/livestockData';
import * as _ from 'lodash';
// import { uid } from 'uid';
import uid from 'uid';

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss']
})
export class BreedDetailsComponent implements OnInit {

  @ViewChild('name', {static: false}) inputField : ElementRef

  livestocks:any = [
    {lsValue: 'Cow', viewValue: 'Cow'},
    {lsValue: 'Goat', viewValue: 'Goat'},
    {lsValue: 'sheep', viewValue: 'Sheep'}
  ];

  // variable declaration
  frameworkComponents: any;
  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  rowData: IbreedData[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private rowLength: number;
  private lsListValue: string;

  constructor( private fb: FormBuilder) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';
    this.isEditMode = false;
    this.showUniqueErr = false;
    this.rowLength = 0;
    

    this.rowData = [
      { id: uid(), lsBreedName: '', editmode: "" }
    ];
   }

  ngOnInit() {
  }

  // ========= livestock form group ===========
  lsDetailsForm = this.fb.group({
    lsName: ["", Validators.required],
    lsNameList: ["", Validators.required]
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
    field: 'lsBreedName',
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



onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}

//============ onClick outside==========

onClickedOutside(e){
  console.log('Clicked outside:', e);
 e.this.lsDetailsForm.get('lsName').clearValidators();
}

// ======== check unique ============
isUnique(selectedValue: string): boolean {
  const findedValue = this.rowData.findIndex((obj: IbreedData) => {
    return obj.lsBreedName === selectedValue;
  });
  return findedValue === -1 ? true : false;
}

// ===== reset value ==========
onReset() {
  this.lsDetailsForm.reset({
    lsNameList: this.lsDetailsForm.value.lsNameList
  })
  console.log( " form value",this.lsDetailsForm.value)
}

// ========== onchange select ========
onChange() {
  console.log("ok")
  this.rowData = [
    { id: uid(), lsBreedName: '', editmode: "" }
  ];  
  this.inputField.nativeElement.focus();
}


// ========= onSubmit ===========
onSubmit(LsDirective: FormGroupDirective) {
  
  const livestockName =  _.upperFirst(this.lsDetailsForm.value.lsName);
  const lsList = this.lsDetailsForm.value.lsNameList;
  console.log("list",lsList);
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
        currentRow.setDataValue("lsBreedName",_.upperFirst(livestockName));
       

      } else {
        // ==== new mode acton ====
        let rowLength = this.rowData.length;

        if (rowLength === 1 && this.rowData[0].lsBreedName === '') {
          // ======= updating the first record ======
          let currentRow = this.gridApi.getRowNode(0);
          currentRow.setDataValue("lsBreedName",_.upperFirst( livestockName));
          
        } else {
          // ====== new record ===========
          let newItem = this.createNewRowData();
          newItem.lsBreedName = _.upperFirst(livestockName);
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
 
  this.rowLength = this.rowData.length
  this.onReset();
}

// ====== Edit data ===================
onEdit(editData: IbreedData): void {

  this.isEditMode = true;
  this.editRecordId = editData.id;
  this.lsDetailsForm.get('lsName').setValue(editData.lsBreedName);
  console.log("edit", editData);
  this.inputField.nativeElement.focus();
}


//  ========= Delete data ===============
onDelete(deleteData: IbreedData): void {
  const deleteIndex = _.findIndex(this.rowData, (obj) => {
    return obj.id === deleteData.id;
  })
  let selectedRow = this.gridApi.getRowNode(deleteIndex)
  console.log("delete", selectedRow);

  if (this.rowData.length === 1) {
    selectedRow.setDataValue("lsBreedName", "");
  } else {

    this.rowData = this.rowData.filter((data) => {
      return data.lsBreedName !== deleteData.lsBreedName
    });
  }
  console.log("delete", this.rowData);

  this.rowLength = this.rowData.length
}

createNewRowData() {
  let newData = {
    id: uid(),
    lsBreedName: '',
    editmode: ''
  };
  return newData;
}

}