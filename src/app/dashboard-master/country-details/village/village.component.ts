import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IVillage } from '../../grphql/interface/countryInterface';
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';
import { ITown } from './../../grphql/interface/countryInterface';
@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {


  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: IVillage[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };

  private stateId: string;
  private countryTitle: string;
  private countryId: string;
  private stateTitle: string;
  districtID: string;
  districtTitle: string;
  talukId: string;
  talukTitle: string;
  townId: string;
  townTitle: string;

  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  constructor(
    private dataService: CountryService,
    private toasterService: ToasterService,
    private observableService: ObservableService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent
    }

    this.rowSelection = 'single';
    this.isEditMode = false;
    this.showUniqueErr = false;

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      editable: true,
      resizable: true,
    };

    this.observableService.navigateTab().subscribe(
      data => {
        console.log(data)
        if (data.tabName === "VILLAGE") {
          this.townId = data.townId
          this.townTitle = data.townName
          this.talukId = data.talukId
          this.talukTitle = data.talukName
          this.districtID = data.districtId
          this.districtTitle = data.distinctName
          this.stateId = data.stateId;
          this.stateTitle = data.stateName
          this.countryId = data.countryId;
          this.countryTitle = data.countryName;
          console.log(this.townTitle)
          this.gridData()
        } else {
          console.log("not village");
        }

      }
    )

    this.rowData = [
      {
        id: "",
        village: "",
        pincode: "",
        editMode: ""
      }
    ];

    this.getRowNodeId = (d): string => {
      return d.id
    }

  }



  ngOnInit() {
  }


  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true,

    },
    {
      headerName: 'Taluk Name',
      field: 'village',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.village = _.upperFirst(params.newValue);

        return true;
      }
    },


    {
      headerName: 'Taluk Pin Code',
      field: 'pincode',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.pincode = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        btn: "save",
        onEdit: this.onSave.bind(this),
        // onDelete: this.onDelete.bind(this),
      }
    },
    /* {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'gridButtonRendender',
      cellRendererParams: {
        btnName: "village",
        onSelect: this.townTab.bind(this)
      }
    } */
  ];

  backTab() {
    let changeData = "TOWN";
    this.observableService.setNav(changeData);
  }

  //====== grid on load data based on country =========
  gridData() {
    
    
    this.dataService.FindAllTownVillage(this.townId).subscribe(
      res => {
        this.rowData = res.FindAllTownVillage;
      }
    )
  } 

  // ====== Unique ===================

  /* isUnique(state: string): boolean {
   const findedValue = this.rowData.findIndex((obj: IState) => {
     return obj.state !== state;
   });
   this.showUniqueErr = true;
   console.log(this.showUniqueErr)
 
   return findedValue === -1 ? true : false;
 } */


   // ============= grid Ready============
   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // ============ new row data =============
  createNewRowData() {
    let newData = {
      id: "",
      village: "",
      pincode: "",
      editMode: ""
    }

    return newData;
  }

  // ======= adding new row =================
  onAddRow() {
    this.gridApi.deselectAll()
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    // printResult(res);
    console.log(res);

    let currentNode = this.gridApi.getRowNode(newItem.id)
    console.log(currentNode);
    // currentNode.clearSelection(true);
    currentNode.setSelected(true, true);
    this.gridApi.ensureIndexVisible(currentNode.rowIndex);
    return res;
  }
  // ========= on save button ================
   onSave(editData: IVillage): void {

    console.log("submit village");
    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      // this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.state)) {

      this.UpdateVillage(editData);
      // } else {
      //   this.showUniqueErr = false;
      // }
    }

    // currentNode.setSelected(false);

    this.gridApi.deselectAll()

    // this.editBtnClicked = true;

  } 


  // ====== delete button click ===================
  /*  onDelete(deleteData: ITaluk): void {
 
     let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
     
     this.delete(deleteIndex);
 
   } */

  // ====== update country ========
  UpdateVillage(cellData) {
   let village = cellData.village;
   let pincode = cellData.pincode
   let countryId = this.countryId
   let townId = this.townId

   this.dataService.createVillage(
     { countryId, townId, village, pincode }, townId
   ).subscribe(
     res => {
       this.rowData = [...this.rowData, res.CreateVillage]
       console.log(this.rowData)
     },
     err => {
       console.log("ls error:", err);
       this.toasterService.pop("error", "Server Error", err)
     }
   )
 } 

  // ======edit country =========
  /* edit(cellData, rowIndex) {

    let state = cellData.state;
    let stateCapital = cellData.stateCapital
    let stateCode = cellData.stateCode
    let pincode = cellData.pincode
    let countryId = this.countryId
    let stateId = this.rowData[rowIndex].id

    this.dataService.editState({countryId, stateId, state, stateCapital, stateCode, pincode }, countryId).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditState;
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  } */

  // ====== Delete country ======

  /* delete(rowIndex) {
    console.log("im in delete", rowIndex);
    console.log(this.rowData[rowIndex]);
    let countryId = this.countryId;
    let StateId = this.stateId
    let DistrictId = this.rowData[rowIndex].id

    this.dataService.deleteDistrict(countryId, StateId, DistrictId).subscribe(
      res => {
        this.rowData[rowIndex] = res.DeleteDistrict
        console.log(this.rowData);
        this.rowData = this.rowData.filter((data) => {
          return data.id !== res.DeleteDistrict.id
        });
        setTimeout(() => {
          let lastRec = _.last(this.rowData)
          let currentNode = this.gridApi.getRowNode(lastRec.id)

          currentNode.setSelected(true);
          this.gridApi.ensureIndexVisible(currentNode.rowIndex);
        }, 100);
      },
      err => {
        console.log(err);
        this.toasterService.pop("warning", "Server Error", err)
      }
    )
  } */
}
