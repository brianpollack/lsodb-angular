import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'
import { ColDef } from 'ag-grid-community';
import { ILivestockData } from '../../models/livestockData';

@Component({
  selector: 'app-livestock-details',
  templateUrl: './livestock-details.component.html',
  styleUrls: ['./livestock-details.component.scss']
})
export class LivestockDetailsComponent implements OnInit {

  // variable declaration
  frameworkComponents: any;
  private  gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  rowData: ILivestockData[];

  constructor(
    private fb: FormBuilder
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';

    this.rowData = [
      { id: null , livestockName: '', editmode: "" }
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
      field: 'id',
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
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // ========= onSubmit ===========
  onSubmit() {
    console.log(this.lsDetailsForm.value);
    let id = this.rowData.length;
    let newItem = createNewRowData();
    let livestockName = this.lsDetailsForm.value.lsName;
    console.log(id);
    if(id == 1){
      let currentRow = this.gridApi.getRowNode(0);
      console.log(currentRow);
      
      currentRow.setDataValue("livestockName", livestockName);
      // let res = this.gridApi.updateRowData({ add: [newItem] });

    }else {

      console.log("ok")
      // id = id + 1;

      // newItem.livestockName = this.lsDetailsForm.value.lsName;
      // let res = this.gridApi.updateRowData({ add: [newItem] });
    }
    
  }

  // ====== rowdata ===============
  
  // ====== Edit data ===================
  onEdit(editData: ILivestockData): void {

    var selectedData = this.gridApi.getSelectedRows();
   this.lsDetailsForm.get('lsName').setValue(editData.livestockName);
    console.log("edit", editData);
  }


  //  ========= Delete data ===============
  onDelete(deleteData: ILivestockData): void {

    this.rowData = this.rowData.filter((data) => {
      return data.livestockName !== deleteData.livestockName
    })
    console.log("delete", this.rowData);
  }

}

let newCount = 1;
function createNewRowData() {
  let newData = {
    id: '' ,
    livestockName: ''
   
  };
  newCount++;
  return newData;
}