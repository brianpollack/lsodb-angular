import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators'
import { ColDef } from 'ag-grid-community';
import { MasterfileService } from '../../services/graphql/masterfile.service'
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import * as _ from 'lodash';
import { IUsers } from './../grphql/interface/userInterface';
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {



  @ViewChild('username', { static: false }) userField: ElementRef;
  @ViewChild('email', { static: false }) emailField: ElementRef;
  @ViewChild('password', { static: false }) passwordField: ElementRef;

  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId
  private rowData: IUsers[];
  private showMenu: boolean = false;
  private hide = true;


  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  showUniqueErr: boolean;
  isEditMode: boolean;
  editRecordId: any;
  deleteDisable: any;
  editBtnClicked: boolean;
  frameworkComponents: { buttonRender: typeof ActionBtnComponent; };

  constructor(
    private fb: FormBuilder,
    private dataService: MasterfileService,
    private toasterService: ToasterService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';

    this.rowData = [
      {
        id: "",
        userName: "",
        email: "",
        password: "",
        editMode: ""

      }
    ];
    this.getRowNodeId = (d): string => {
      return d.id
    }

  }

  ngOnInit() {

    this.dataService.findUser().subscribe(
      res => {
        this.rowData = res.FindAllUsers
      },
      err => {
        console.log("ls error", err);
        this.toasterService.pop("warning", "Server Error", err)
      }



    )


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
      field: 'email',
      width: 200,
      sortable: true
    },
    {
      headerName: 'Password',
      field: 'password',
      width: 150,
      sortable: true
    },
    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      }
    }


  ];

  // ====== on grid ready =========
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.selectIndex(0, false, false);
  }



  // ======== check unique ============
  isUnique(selectedValue: string): boolean {
    const findedValue = this.rowData.findIndex((obj: IUsers) => {
      return obj.userName === selectedValue;
    });
    return findedValue === -1 ? true : false;
  }

  // ====== update user ========
  UpdateUser(rowIndex) {
    let userName = _.upperFirst(this.userForm.value.userName);
    let email = this.userForm.value.userEmail;
    let password = this.userForm.value.userPassword;

    this.dataService.createUser({ userName, email, password }).subscribe(
      res => {

        if (rowIndex === 0) {
          this.rowData[rowIndex] = res.CreateUser
        } else {
          this.rowData = [...this.rowData, res.CreateUser]
        }

      },

      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }

    )
  }
  // ======edit user =========
  edit(rowIndex) {

    let userName = _.upperFirst(this.userForm.value.userName);
    let email = this.userForm.value.userEmail;
    let password = this.userForm.value.userPassword;
    let id = this.rowData[rowIndex].id
    console.log("mail", email);
    console.log("pas", password);
    this.dataService.editUser({ id, userName, email, password }).subscribe(
      res => {
        console.log("hello")
        this.rowData[rowIndex] = res.EditUser;
        console.log(this.rowData[rowIndex]);
        let currentNode = this.gridApi.getRowNode(this.rowData[rowIndex].id);
        currentNode.setDataValue("userName", _.upperFirst(userName));
        currentNode.setDataValue("email", email);
        currentNode.setDataValue("password", password);
        
        // console.log(this.isEditMode)
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  }

  // ====== Delete user ======

  delete(rowIndex) {

    let id = this.rowData[rowIndex].id
    this.dataService.deleteUser(id).subscribe(
      res => {
        console.log(res)
        this.rowData[rowIndex] = res.DeleteUser
        this.rowData = this.rowData.filter((data) => {

          // return data.livestockName !== res.DeleteLivestock.livestockName
          return data.id !== res.DeleteUser.id
        });
        setTimeout(() => {
          let lastRec = _.last(this.rowData)
          // console.log(lastRec);
          let currentNode = this.gridApi.getRowNode(lastRec.id)
          // console.log(currentNode);
          currentNode.setSelected(true);
          this.gridApi.ensureIndexVisible(currentNode.rowIndex);
        }, 100);
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("warning", "Server Error", err)
      }
    )
  }





  // ======== on submit ============
  onSubmit(userDirective: FormGroupDirective) {


    const userName = _.upperFirst(this.userForm.value.userName);
    if (this.userForm.valid) {

      // if (this.isUnique(userName)) {
      //   this.showUniqueErr = false;
        console.log("edit",this.isEditMode);
      if (this.isEditMode) {
        //==== edit mode action ====
        console.log(this.isEditMode)
        console.log("im in edit ");
        const index = _.findIndex(this.rowData, (obj) => {
          return obj.id === this.editRecordId;
        })
        this.edit(index);
        this.isEditMode = false;
        this.showMenu = false;


      } else {
        // ==== new mode acton ====

        // if(this.isUnique(userName)){
        //   this.showUniqueErr = false;
        console.log("im in new");
          let rowLength = this.rowData.length;
        if (rowLength === 1 && this.rowData[0].userName === '') {
          // ======= updating the first record ======
          let currentRow = this.gridApi.getRowNode(0);
          this.UpdateUser(currentRow);

        } else {
          // ====== new record ===========
          console.log("Im in update")
          this.UpdateUser(-1)

          setTimeout(() => {
            let lastRec = _.last(this.rowData)
            console.log(lastRec);
            let currentNode = this.gridApi.getRowNode(lastRec.id)
            console.log(currentNode);
            currentNode.setSelected(true);
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 100);
        }

        // }else{
        //   this.showUniqueErr = true;
        // }
        

      }

    }

    // this.userForm.reset()

    userDirective.resetForm();
    this.userField.nativeElement.focus();
  }

  // ====== Edit data ===================
  onEdit(editData: IUsers): void {

    this.showMenu = true
    this.isEditMode = true;
    this.editRecordId = editData.id;
    // console.log(editData);
    this.userForm.setValue({
      userName: editData.userName,
      userEmail: editData.email,
      userPassword: editData.password
    });
    this.editBtnClicked = true;

    // this.userField.nativeElement.focus();
  }


  //  ========= Delete data ===============
  onDelete(deleteData: IUsers): void {

    console.log("delete", deleteData);
    const deleteIndex = _.findIndex(this.rowData, (obj) => {
      return obj.id === deleteData.id;
    });
    // let selectedRow = this.gridApi.getRowNode(deleteIndex)
    this.delete(deleteIndex);

  }






}
