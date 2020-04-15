import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators'
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId
  private rowData;
  private showMenu: boolean = false;
  private hide = true;

  constructor(
    private fb: FormBuilder
  ) { 

    this.rowData = [
      {
      id: "",
      userName: "",
      emailId:"",
      password:""

    }
  ]

  }

  ngOnInit() {
  }

  onToggle() {
    this.showMenu = !this.showMenu
    console.log(this.showMenu);
    }

  userForm = this.fb.group({
    userName: ["", Validators.required],
    userEmail: ["", [Validators.required, CustomValidators.email]],
    userPassword: ["", [Validators.required, Validators.minLength(6)]]
  })

  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true
  }, 
  {
    headerName: 'User Name',
    field: 'userName',   
    width: 200,
    sortable: true
  },
  {
    headerName: 'Email Id',
    field: 'emailId',   
    width: 300,
    sortable: true
  },
  {
    headerName: 'Password',
    field: 'password',   
    width: 200,
    sortable: true
  }


];
onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  // this.gridApi.selectIndex(0, false, false);
}


}
