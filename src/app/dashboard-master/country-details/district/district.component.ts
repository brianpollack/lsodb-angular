import { Component, OnInit, ViewChild } from '@angular/core';
// import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IDistrict, IParamsCreateDistrict } from '../../grphql/interface/countryInterface';
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';
import { distinct } from 'rxjs/operators';
import { CSVDistrict } from 'src/app/models/CSVmodel';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  // variable declaration

  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: IDistrict[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private countryTitle: string;
  countryId: string;
  quickSearchValue: any = "";
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };
  stateId: string;

  
  stateTitle: string;

// csv variables
public records: IDistrict[] = [];
@ViewChild('csvReader', { static: false }) csvReader: any;
  saveBtn: string;
 

constructor(
    private dataService: CountryService,
    // private toasterService: ToasterService,
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
        console.log(data.countryName);
        if (data.tabName === "DISTRICT") {
          this.stateId = data.stateId;
          this.stateTitle = data.stateName
          this.countryId = data.countryId;
          this.countryTitle = data.countryName;
          console.log(this.stateTitle)
          this.gridData()
        } else {
          console.log("not district");
        }

      }
    )

    this.rowData = [
      {
        id: "",
        district: "",
        districtCapital: "",
        districtCode: "",
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
      headerName: 'District Name',
      field: 'district',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.district = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'District Capital',
      field: 'districtCapital',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.districtCapital = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'District Code',
      field: 'districtCode',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.districtCode = _.toUpper(params.newValue);

        return true;
      }
    },
    {
      headerName: 'District Pin Code',
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
        btnName: "Taluk",
        onSelect: this.districtTab.bind(this)
      }
    }


  ];

  onFilterChanged() {
    console.log(this.quickSearchValue);
    this.gridApi.setQuickFilter(this.quickSearchValue)
   
}
  //============= grid district button ===========
  districtTab(sectedRow) {
    console.log(sectedRow);
    let countryDetails = {
      districtId:  sectedRow.id,
      distinctName: sectedRow.district,
      stateId: this.stateId,
      stateName: this.stateTitle ,
      countryId: this.countryId,
      countryName: this.countryTitle,
      tabName: "TALUK"
    }
    this.observableService.setTab(countryDetails);
  }

  backTab() {
    let changeData = "STATE";
    this.observableService.setNav(changeData);
  }

  //====== grid on load data based on country =========
  gridData() {
    console.log("state");
    console.log(this.stateId);
    this.dataService.FindAllStateDistricts(this.stateId).subscribe(
      res => {

        this.rowData = res.FindAllStateDistricts
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
      district: "",
      districtCapital: "",
      districtCode: "",
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
  onSave(editData: IDistrict): void {

    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.state)) {

      this.UpdateDistrict(editData);
      // } else {
      //   this.showUniqueErr = false;
      // }
    }

    // currentNode.setSelected(false);

    this.gridApi.deselectAll()

    // this.editBtnClicked = true;

  }


  // ====== delete button click ===================
  onDelete(deleteData: IDistrict): void {

    let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
    console.log(deleteIndex);
    this.delete(deleteIndex);

  }


  // ====== update country ========
  UpdateDistrict(cellData) {
    let district = cellData.district;
    let districtCapital = cellData.districtCapital
    let districtCode = cellData.districtCode
    let pincode = cellData.pincode
    let countryId = this.countryId
    let stateId = this.stateId

    this.dataService.createDistrict(
      { countryId, stateId, district, districtCapital, districtCode, pincode }, stateId
    ).subscribe(
      res => {
        this.rowData = [...this.rowData, res.CreateDistrict];
        this.observableService.setTosterMsg({
          type: "info",
          title: "Saved",
          message: "Sucessfully saved"
      })
      },
    )
  }
  // ======edit country =========
  edit(cellData, rowIndex) {

    let countryId = this.countryId
    let district = cellData.district;
    let districtCapital = cellData.districtCapital
    let districtCode = cellData.districtCode
    let pincode = cellData.pincode
    let districtId = this.rowData[rowIndex].id
    let stateId = this.stateId
    
    this.dataService.editDistrict({countryId, districtId, district, districtCapital, districtCode, pincode }, stateId).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditDistrict;
        this.observableService.setTosterMsg({
          type: "info",
          title: "Edit",
          message: "Sucessfully Editted"
      })
      },
    )
  } 

  // ====== Delete country ======

  delete(rowIndex) {
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
        // setTimeout(() => {
          let lastRec = _.last(this.rowData)
          let currentNode = this.gridApi.getRowNode(lastRec.id)

          currentNode.setSelected(true);
          this.gridApi.ensureIndexVisible(currentNode.rowIndex);
        // }, 100);

        this.observableService.setTosterMsg({
          type: "info",
          title: "Delete",
          message: "Sucessfully Deleted"
      })
      },
     
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
        this.rowData = this.records

        this.saveBtn = "Enable"

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
        let csvRecord: CSVDistrict = new CSVDistrict();
        csvRecord.id = "";
        // csvRecord.id = curruntRecord[0].trim();  
        csvRecord.district = curruntRecord[1].trim();
        csvRecord.districtCode = curruntRecord[2].trim();
        csvRecord.districtCapital= curruntRecord[3].trim();
        // csvRecord.pincode = curruntRecord[4].trim();
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

  handleSaveAll() {
    let countryId = this.countryId;
    let stateId = this.stateId;

    let saveAllData = [] as IParamsCreateDistrict[]; //= _.cloneDeep(this.rowData);

    
    this.rowData.forEach((e) => {
      let newObj = {} as IParamsCreateDistrict;
      Object.assign(newObj, e);
      delete newObj['id'];
      newObj.countryId = countryId;
      newObj.stateId = stateId;
      saveAllData.push(newObj);
    });

     this.dataService.insertDistrict(saveAllData, countryId).subscribe(
       res =>{
        this.observableService.setTosterMsg({
          type: "info",
          title: "Save All",
          message: "Sucessfully  Saved All"
      })
       }
     )
    console.log(this.rowData);
    console.log(saveAllData);
  }
}
