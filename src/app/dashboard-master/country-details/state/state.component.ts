import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IState } from '../../grphql/interface/countryInterface';
import { ICountry } from './../../grphql/interface/countryInterface';
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';
import { CSVRecord } from 'src/app/models/CSVmodel';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {


  @ViewChild('stateName', {static: false}) inputField : ElementRef
  @ViewChild('list', {static: false}) listField : ElementRef
  // variable declaration
  
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: IState[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private countryTitle: string;
   countryId: string;
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };

  // csv variables
  public records: IState[] = [];  
  @ViewChild('csvReader', {static: false}) csvReader: any;  


  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  countryLists: any;

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
      minWidth: 130,
      editable: true,
      resizable: true,
    };
    

    this.observableService.navigateTab().subscribe(
      data => {
        // console.log(data)
        if(data.tabName === "STATE"){
          this.countryId = data.countryId;
          this.countryTitle = data.countryName;
          // console.log(this.countryTitle)
          this.gridData()
        }else{
          console.log("not state");
        }

      }
    )

    this.rowData = [
      {
        id: "",
        state: "",
        stateCapital: "",
        stateCode: "",
        pincode: "",
        editMode: "",
      }
    ];

    this.getRowNodeId = (d): string => {
      return d.id
    }
  }
  
  
  ngOnInit() {
    
    }
    
  

   //  ========= coloum defenition =============
   columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true,
      
    },
    {
      headerName: 'State Name',
      field: 'state',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.state = _.startCase(params.newValue);
        return true;
      }
    },
    {
      headerName: 'State Capital',
      field: 'stateCapital',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCapital = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'State Code',
      field: 'stateCode',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCode = _.toUpper(params.newValue);

        return true;
      }
    },
    {
      headerName: 'State Pin Code',
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
        btnName: "District",
        onSelect: this.stateTab.bind(this)
      }
    }


  ];

  stateTab(sectedRow) {
    console.log(sectedRow);
    let countryDetails = {
      stateId: sectedRow.id,
      stateName: sectedRow.state,
      countryId: this.countryId,
      countryName: this.countryLists,
      tabName: "DISTRICT"
    }

    this.observableService.setTab(countryDetails);
  }

  backTab(){
   let changeData = "COUNTRY";
   this.observableService.setNav(changeData);
  }
  nextTab(){
   let changeData = "DISTRICT";
   this.observableService.setNav(changeData);
  }

  //====== grid on load data based on country =========
  gridData() {
    console.log("state");
    console.log(this.countryId);
    this.dataService.FindAllCountryStates(this.countryId).subscribe(
      res => {

        this.rowData = res.FindAllCountryStates
        console.log(this.rowData);
      }
      )
}
    // ====== Unique ===================

    isUnique(state: string): boolean {
      const findedValue = this.rowData.findIndex((obj: IState) => {
        return obj.state !== state;
      });
      this.showUniqueErr = true;
      console.log(this.showUniqueErr)
  
      return findedValue === -1 ? true : false;
    }
  

  // ============= grid Ready============
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

// ============ new row data =============
  createNewRowData() {
    let newData = {
      id: "",
        state: "",
        stateCapital: "",
        stateCode: "",
        pincode: "",
        editMode: "",
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


  onSave(editData: IState): void {

    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.state)) {
        
        this.UpdateState(editData);
      // } else {
      //   this.showUniqueErr = false;
      // }
    }

    // currentNode.setSelected(false);
    
    this.gridApi.deselectAll()

    // this.editBtnClicked = true;

  }
  // ====== delete button click ===================
  onDelete(deleteData: IState): void {

    let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
    console.log(deleteIndex);
    // const deleteIndex = _.findIndex(this.rowData, (obj) => {
    //   return obj.id === deleteData.id;
    // });
    // let selectedRow = this.gridApi.getRowNode(deleteIndex)
    this.delete(deleteIndex);

  }
 

  // ====== update country ========
  UpdateState(cellData) {
    let state = cellData.state;
    let stateCapital = cellData.stateCapital
    let stateCode = cellData.stateCode
    let pincode = cellData.pincode
    let countryId = this.countryId
    this.dataService.createState({ countryId, state, stateCapital, stateCode, pincode }, countryId).subscribe(
      res => {
        this.rowData = [...this.rowData, res.CreateState]
        console.log(this.rowData)
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  }
  // ======edit country =========
  edit(cellData, rowIndex) {

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
  }
  
// ====== Delete country ======

delete(rowIndex) {
  console.log("im in delete", rowIndex);
  console.log(this.rowData[rowIndex]);
  let countryId = this.countryId
  let StateId = this.rowData[rowIndex].id
  
  this.dataService.deleteState(countryId,StateId ).subscribe(
    res => {     
      this.rowData[rowIndex] = res.DeleteState
      console.log( this.rowData);
      this.rowData = this.rowData.filter((data) => {
        return data.id !== res.DeleteState.id
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

uploadListener($event: any): void {  
  
  let text = [];  
  let files = $event.srcElement.files;  

  if (this.isValidCSVFile(files[0])) {  

    let input = $event.target;  
    let reader = new FileReader();  
    reader.readAsText(input.files[0]);  

    reader.onload = () => {  
      let csvData = reader.result;  
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  

      let headersRow = this.getHeaderArray(csvRecordsArray);  
      console.log(headersRow);
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      console.log(this.records);
      this.rowData = [...this.records]

    };  

    reader.onerror = function () {  
      console.log('error is occured while reading file!');  
    };  

  } else {  
    alert("Please import valid .csv file.");  
    this.fileReset();  
  }  
}  
 
getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
  let csvArr = [];  

  for (let i = 1; i < csvRecordsArray.length; i++) {  
    let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
    if (curruntRecord.length == headerLength) {  
      let csvRecord: CSVRecord = new CSVRecord();  
      csvRecord.id = curruntRecord[0].trim();  
      csvRecord.state = curruntRecord[1].trim();  
      csvRecord.stateCode = curruntRecord[2].trim();  
      csvRecord.stateCapital = curruntRecord[3].trim();  
      csvRecord.pincode = curruntRecord[4].trim();  
      // csvRecord.mobile = curruntRecord[5].trim();  
      csvArr.push(csvRecord);  
    }  
  }  
  return csvArr;  
}  

isValidCSVFile(file: any) {  
  return file.name.endsWith(".csv");  
}  

getHeaderArray(csvRecordsArr: any) {  
  let headers = (<string>csvRecordsArr[0]).split(',');  
  let headerArray = [];  
  for (let j = 0; j < headers.length; j++) {  
    headerArray.push(headers[j]);  
  }  
  return headerArray;  
}  

fileReset() {  
  this.csvReader.nativeElement.value = "";  
  this.records = [];  
}  




 
   
   
   

}
