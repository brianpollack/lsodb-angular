import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ITown } from '../../grphql/interface/countryInterface';
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';



@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {


  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: ITown[];
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
  talukTitle: string = "Select Taluk";

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
        if (data.tabName === "TOWN") {
          this.talukId = data.talukId
          this.talukTitle = data.talukName
          this.districtID = data.districtId
          this.districtTitle = data.distinctName
          this.stateId = data.stateId;
          this.stateTitle = data.stateName
          this.countryId = data.countryId;
          this.countryTitle = data.countryName;
          console.log(this.talukTitle)
          this.gridData();
        } else {
          console.log("not Town");
        }

      }
    )

    this.rowData = [
      {
        id: "",
        town: "",
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
      field: 'town',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.town = _.upperFirst(params.newValue);

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
        onDelete: this.onDelete.bind(this),
      }
    },
    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'gridButtonRendender',
      cellRendererParams: {
        btnName: "village",
        onSelect: this.townTab.bind(this)
      }
    }


  ];

  //============= grid taluk button ===========
  townTab(sectedRow) {
    console.log(sectedRow);
    let countryDetails = {
      townId: sectedRow.id,
      townName:  sectedRow.town,
      talukId: this.talukId,
      talukName: this.talukTitle,
      districtId: this.districtID,
      distinctName: this.districtTitle,
      stateId: this.stateId,
      stateName: this.stateTitle,
      countryId: this.countryId,
      countryName: this.countryTitle,
      tabName: "VILLAGE"
    }
    this.observableService.setTab(countryDetails);
  }

  backTab() {
    let changeData = "TALUK";
    this.observableService.setNav(changeData);
  }

    //====== grid on load data based on country =========
   gridData() {
  
    this.dataService.FindAllTalukTown(this.talukId).subscribe(
      res => {
  
        this.rowData = res.FindAllTalukTown
        console.log(this.rowData);
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
      town: "",
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
  onSave(editData: ITown): void {

    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.state)) {

      this.UpdateTown(editData);
      // } else {
      //   this.showUniqueErr = false;
      // }
    }

    // currentNode.setSelected(false);

    this.gridApi.deselectAll()

    // this.editBtnClicked = true;

  } 


  // ====== delete button click ===================
  onDelete(deleteData: ITown): void {
 
     let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
     
     this.delete(deleteIndex);
 
   } 

  // ====== update country ========
  UpdateTown(cellData) {
   let town = cellData.town;
   let pincode = cellData.pincode
   let countryId = this.countryId
   let taluckId = this.talukId

   this.dataService.createTown(
     { countryId, taluckId, town, pincode }, taluckId
   ).subscribe(
     res => {
       this.rowData = [...this.rowData, res.CreateTown]
       console.log(this.rowData)
     },
     err => {
       console.log("ls error:", err);
       this.toasterService.pop("error", "Server Error", err)
     }
   )
 } 

  // ======edit town =========
   edit(cellData, rowIndex) {

    let town = cellData.town;
    let pincode = cellData.pincode
    let countryId = this.countryId
    let townId = this.rowData[rowIndex].id
    let taluckId = this.talukId

    this.dataService.editTown({countryId, townId, town, pincode }, taluckId).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditTown;
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  }

  // ====== Delete country ======

   delete(rowIndex) {
    let countryId = this.countryId;
    let taluckId = this.talukId
    let townId = this.rowData[rowIndex].id
    this.dataService.deleteTown(countryId, townId, taluckId).subscribe(
      res => {
        // console.log("hello");
        this.rowData[rowIndex] = res.DeleteTown
        // console.log(this.rowData);
        this.rowData = this.rowData.filter((data) => {
          return data.id !== res.DeleteTown.id
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
  } 
}
