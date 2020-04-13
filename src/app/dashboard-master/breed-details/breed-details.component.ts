import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { ActionBtnComponent } from '../../ag-grid-components/action-btn/action-btn.component'
import { ColDef, ColumnGroup } from 'ag-grid-community';
import { IbreedData } from '../../models/livestockData';
import * as _ from 'lodash';
// import { uid } from 'uid';
import uid from 'uid';
import { MasterfileService } from './../../services/graphql/masterfile.service'
import { IBreed, ILivestockRef } from '../grphql/interface/breedInterface';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Livestock } from './../grphql/interface/livestockInterface';
import { onError } from "apollo-link-error";

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss']
})
export class BreedDetailsComponent implements OnInit {

  @ViewChild('name', {static: false}) inputField : ElementRef
  @ViewChild('list', {static: false}) listField : ElementRef

 

  // variable declaration
  frameworkComponents: any;
  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: IBreed[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private rowLength: number;
  private lsListValue: string;
  livestocksLists:any;
  livestockId: string;

  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });

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
      { id:"", 
      breedName: "", 
      editMode: "" ,
      livestock: {
        livestockId: ""
      }
     }
    ];

    this.getRowNodeId = (d): string => {
      return d.id
    }

    this.livestocksLists = [

      {
        id: "",
        livestockName: '',
        editMode: "",
        breedCount: 0
      }
     
    ];
   }

  ngOnInit() {
    this.LivestockList();
    
    // console.log(this.rowData);
    // this.gridApi.selectIndex(0, true);

   
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
    field: 'breedName',
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

// onClickedOutside(e){
//   console.log('Clicked outside:', e);
//  e.this.lsDetailsForm.get('lsName').clearValidators();
// }

// ======== check unique ============
isUnique(selectedValue: string): boolean {
  const findedValue = this.rowData.findIndex((obj: IBreed) => {
    return obj.breedName === selectedValue;
  });
  return findedValue === -1 ? true : false;
}

// ===== reset value ==========
onReset() {
  this.lsDetailsForm.reset({
    lsNameList: this.lsDetailsForm.value.lsNameList
  })
  // console.log( " form value",this.lsDetailsForm.value)
}

// ========== onchange select ========
onChange(e) {
  // console.log(e)
 let livestockId = e.value;
  
// console.log(typeof( livestockId));
  this.dataService.findOnlyBreeds( livestockId ).subscribe(
    result => {
      console.log(result);
      this.rowData = result.FindAllLivestockBreeds
      this.rowLength = this.rowData.length;
      // console.log(this.rowData);
    }
  )
  this.inputField.nativeElement.focus();
  this.lsDetailsForm.get('lsName').clearValidators();
  
}

refresh(){
  const lsList = this.lsDetailsForm.value.lsNameList;
  this.dataService.findOnlyBreeds( lsList ).subscribe(
    result => {
      console.log(result);
      this.rowData = result.FindAllLivestockBreeds
      this.rowLength = this.rowData.length;
      // console.log(this.rowData);
    }
  )
}

//====== livestock List =========
LivestockList() {
  this.dataService.findAll().subscribe(
    result => {
      this.livestocksLists = result.FindAllLivestock
    }
    )
    console.log(this.livestocksLists);
}


 // ====update breed =====
 UpdateBreed(rowIndex, lsList) {
  let breedName = _.upperFirst(this.lsDetailsForm.value.lsName);
  let livestockId = lsList
  // let id = lsList
  console.log(livestockId);
  this.dataService.createBreed({ livestockId, breedName }, livestockId).subscribe(
    res => {
      if (rowIndex === 0) {
        this.rowData[rowIndex] = res.CreateBreed
      } else {
        this.rowData = [...this.rowData, res.CreateBreed]
      }
      this.rowLength = this.rowData.length;
      console.log(`update ${this.rowData}`);
    },
    err => {

      
      this.toasterService.pop("error", "Server Error", err)
    }
  )
}

// ====edit breed =====
EditBreed(rowIndex: number, lsList) {
 
  let livestockId = lsList
  let breedName = _.upperFirst(this.lsDetailsForm.value.lsName);
  let breedId = this.rowData[rowIndex].id
  // let livestockId = this.rowData[rowIndex].id

 

  this.dataService.editBreed({ livestockId, breedName, breedId }, livestockId).subscribe(
    res => {
      this.rowData[rowIndex] = res.EditBreed;
      let currentNode = this.gridApi.getRowNode(this.rowData[rowIndex].id);
      currentNode.setDataValue("breedName", _.upperFirst(breedName));
    },
    err => {
      this.toasterService.pop("error", "Server Error", err)
    }
  )
}

// ====== Delete breed ======

DeleteBreed( rowIndex, lsList ) {
  let livestockId = lsList
  let breedId = this.rowData[rowIndex].id
  this.dataService.deleteBreed({livestockId, breedId}, livestockId).subscribe(
    res => {
      this.rowData[rowIndex] = res.DeleteBreed
      this.rowData = this.rowData.filter((data) => {
            return data.breedName !== res.DeleteBreed.breedName
          });

          setTimeout(() => {
            let lastRec= _.last(this.rowData)           
            let currentNode = this.gridApi.getRowNode(lastRec.id)
            currentNode.setSelected(true);
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 100);
          this.rowLength = this.rowData.length;
    },
    err => {
      console.log(err);
      this.toasterService.pop("warning", "Server Error", err)
    }
  )
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

        this.EditBreed(index, lsList);
        // this.lsDetailsForm.reset();

        // let currentRow = this.gridApi.getRowNode(index);
        // console.log(currentRow);
        // currentRow.setDataValue("breedName",_.upperFirst(livestockName));
       

      } else {
        // ==== new mode acton ====
        let rowLength = this.rowData.length;
        if (rowLength === 1 && this.rowData[0].breedName === '') {
          // ======= updating the first record ======
          let currentRow = this.gridApi.getRowNode(0);
          console.log(currentRow);
          this.UpdateBreed(currentRow , lsList)
          // currentRow.setDataValue("breedName",_.upperFirst( livestockName));
          
        } else {
          // ====== new record ===========
          // let newItem = this.createNewRowData();
          // newItem.breedName = _.upperFirst(livestockName);
          // this.gridApi.updateRowData({ add: [newItem] });
          // this.rowData.push(newItem)
          this.UpdateBreed(-1, lsList);
          setTimeout(() => {
            let lastRec= _.last(this.rowData)
            console.log(lastRec);
            let currentNode = this.gridApi.getRowNode(lastRec.id)
            console.log(currentNode);
            currentNode.setSelected(true);
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 100);   
          
        }
        
      }
    } else {
      this.showUniqueErr = true;
      console.log(this.showUniqueErr);
    }
  }
  this.isEditMode = false; 
  // this.rowLength = this.rowData.length
  this.onReset();
}

// ====== Edit data ===================
onEdit(editData: IBreed): void {

 const lsList = this.lsDetailsForm.value.lsNameList;
  this.isEditMode = true;
  this.editRecordId = editData.id;
  this.lsDetailsForm.get('lsName').setValue(editData.breedName);
  console.log("edit", editData);
  this.inputField.nativeElement.focus();
 
}


//  ========= Delete data ===============
onDelete(deleteData: IBreed): void {
  const lsList = this.lsDetailsForm.value.lsNameList;
  const deleteIndex = _.findIndex(this.rowData, (obj) => {
    return obj.id === deleteData.id;
  })
 this.DeleteBreed(deleteIndex, lsList);
  // this.rowLength = this.rowData.length
}
}