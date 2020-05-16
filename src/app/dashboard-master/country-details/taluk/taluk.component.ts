import { Component, OnInit, ViewChild } from '@angular/core';
// import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ITaluk, IParamsCreateTaluk } from '../../grphql/interface/countryInterface';
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';
import { CSVTaluk } from 'src/app/models/CSVmodel';


@Component({
  selector: 'app-taluk',
  templateUrl: './taluk.component.html',
  styleUrls: ['./taluk.component.scss']
})
export class TalukComponent implements OnInit {


  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: ITaluk[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  quickSearchValue: any = "";
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

 
  // csv variables
public records: ITaluk[] = [];
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
        console.log("taluk",data)
        if (data.tabName === "TALUK") {

          this.districtID = data.districtId,
            this.districtTitle = data.distinctName,
            this.stateId = data.stateId;
          this.stateTitle = data.stateName
          this.countryId = data.countryId;
          this.countryTitle = data.countryName;
          console.log(this.districtTitle)
          this.gridData()
        } else {
          console.log("not taluk");
        }

      }
    )

    this.rowData = [
      {
        id: "",
        taluk: "",
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
      field: 'taluk',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.taluk = _.upperFirst(params.newValue);

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
        btnName: "Town",
        onSelect: this.talukTab.bind(this)
      }
    }


  ];

  onFilterChanged() {
    console.log(this.quickSearchValue);
    this.gridApi.setQuickFilter(this.quickSearchValue)
   
}

  //============= grid taluk button ===========
  talukTab(sectedRow) {
    if(sectedRow.id !== ""){
    console.log(sectedRow);
    let countryDetails = {
      talukId: sectedRow.id,
      talukName: sectedRow.taluk,
      districtId: this.districtID,
      distinctName: this.districtTitle,
      stateId: this.stateId,
      stateName: this.stateTitle,
      countryId: this.countryId,
      countryName: this.countryTitle,
      tabName: "TOWN"
    }
    this.observableService.setTab(countryDetails);
  }else{
    this.observableService.setTosterMsg({
      type: "warning",
        title: "Save Data!",
        message: "Before entering the Town tab Save all data!"
    })
  }
  }

  backTab() {
    let changeData = "DISTRICT";
    this.observableService.setNav(changeData);
  }

  //====== grid on load data based on country =========
  gridData() {
    
    this.dataService.FindAllDistrictTaluks(this.districtID).subscribe(
      res => {
  
        this.rowData = res.FindAllDistrictTaluks
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
      taluk: "",
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
   onSave(editData: ITaluk): void {

    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.state)) {

      this.UpdateTaluk(editData);
      // } else {
      //   this.showUniqueErr = false;
      // }
    }

    // currentNode.setSelected(false);

    this.gridApi.deselectAll()

    // this.editBtnClicked = true;

  } 


  // ====== delete button click ===================
  onDelete(deleteData: ITaluk): void {
 
     let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
     
     this.delete(deleteIndex);
 
   } 

  // ====== update country ========
   UpdateTaluk(cellData) {
   let taluk = cellData.taluk;
   let pincode = cellData.pincode
   let countryId = this.countryId
   let stateId = this.stateId
   let districtId = this.districtID

   this.dataService.createTaluk(
     { countryId, districtId, taluk, pincode }, districtId
   ).subscribe(
     res => {
       this.rowData = [...this.rowData, res.CreateTaluk]
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

    console.log("rrrr");
    let taluk = cellData.taluk;
   let pincode = cellData.pincode
    let countryId = this.countryId
    let talukId = this.rowData[rowIndex].id
    let districtId = this.districtID

    this.dataService.editTaluk({countryId, talukId, taluk, pincode }, districtId).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditTaluk;
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
    
    let countryId = this.countryId;
    let DistrictId = this.districtID
    let talukId = this.rowData[rowIndex].id

    this.dataService.deleteTaluk(countryId, talukId, DistrictId).subscribe(
      res => {
        this.rowData[rowIndex] = res.DeleteTaluk
        console.log(this.rowData);
        this.rowData = this.rowData.filter((data) => {
          return data.id !== res.DeleteTaluk.id
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
        let csvRecord: CSVTaluk = new CSVTaluk();
        csvRecord.id = "";
        csvRecord.taluk = curruntRecord[1].trim();
        // csvRecord.pincode = curruntRecord[4].trim();
       
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
    let districtId = this.districtID;

    let saveAllData = [] as IParamsCreateTaluk[]; //= _.cloneDeep(this.rowData);

    
    this.rowData.forEach((e) => {
      let newObj = {} as IParamsCreateTaluk;
      Object.assign(newObj, e);
      delete newObj['id'];
      newObj.countryId = countryId;
      newObj.districtId = districtId;
      saveAllData.push(newObj);
    });

     this.dataService.insertTaluk(saveAllData, countryId).subscribe(
       res =>{
        this.rowData = res.InsertTaluk
         console.log("save data ",saveAllData);
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
