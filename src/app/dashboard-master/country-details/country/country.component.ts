import { Component, OnInit } from '@angular/core';
import { ActionBtnComponent } from '../../../ag-grid-components/action-btn/action-btn.component'
import { ColDef, GridApi } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
// import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';
import { ICountry } from './../../grphql/interface/countryInterface';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import { ObservableService } from './../../../services/observable.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId
  private rowData: ICountry[];
  private showMenu: boolean = false;
  private hide = true;
  quickSearchValue: any = "";
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };
  isEditMode: boolean = false;
  editRecordId: any;
  editBtnClicked: boolean;
  showUniqueErr: boolean = false;
  // setNewData: void;

  constructor(
    // private fb: FormBuilder,
    private dataService: CountryService,
    // private toasterService: ToasterService,
    private observableService: ObservableService
  ) {

    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent
    };

    this.defaultColDef = {
      // flex: 1,
     
      editable: true,
      // resizable: true,
    };

    this.rowData = [
      {
        id: "",
        country: "",
        countryCapital: "",
        countryCode: "",
        editMode: "",

      }
    ];

    this.getRowNodeId = (d): string => {
      return d.id
    }
  }

  ngOnInit() {

    this.dataService.findAllCountry().subscribe(
      res => {
        this.rowData = res.FindAllCountry
      }
    )
  }


  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 85,
      sortable: true
    },
    {
      headerName: 'Country Name',
      field: 'country',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.country = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'Country Capital',
      field: 'countryCapital',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);

        params.data.countryCapital = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'Country Code',
      field: 'countryCode',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);

        params.data.countryCode = _.toUpper(params.newValue);

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
        btnName: "State",
        onSelect: this.stateTab.bind(this)
      }
    }


  ];

  onFilterChanged() {
    console.log(this.quickSearchValue);
    this.gridApi.setQuickFilter(this.quickSearchValue)
   
}

  stateTab(sectedRow) {
    console.log(sectedRow);
    let countryDetails = {
      countryId: sectedRow.id,
      countryName: sectedRow.country,
      tabName: "STATE"
    }

    this.observableService.setTab(countryDetails);
  }

  // ====== Unique ===================

  /* isUnique(country: string): boolean {
    const findedValue = this.rowData.findIndex((obj: ICountry) => {
      return obj.country === country;
    });
    this.showUniqueErr = true;
    console.log(this.showUniqueErr)

    return findedValue === -1 ? true : false;
  } */

  // ====== on grid ready =========
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.selectIndex(0, false, false);
  }

  // ============ new row data =============
  createNewRowData() {
    let newData = {
      id: "",
      country: "",
      countryCapital: "",
      countryCode: "",
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
  // ====== save button click ===================
  onSave(editData: ICountry): void {

    let currentNode = this.gridApi.getRowNode(editData.id);
    console.log(currentNode.id);


    if (currentNode.id !== "") {
      console.log("In edit");
      this.edit(editData, currentNode.rowIndex);
    } else {
      console.log("in new");
      // if (this.isUnique(editData.country)) {
        
        this.UpdateCountry(editData);
      // } else {
        // this.showUniqueErr = false;
      // }
    }


    // this.editBtnClicked = true;

  }
  // ====== delete button click ===================
  onDelete(deleteData: ICountry): void {

    let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
    console.log(deleteIndex);
    // const deleteIndex = _.findIndex(this.rowData, (obj) => {
    //   return obj.id === deleteData.id;
    // });
    // let selectedRow = this.gridApi.getRowNode(deleteIndex)
    this.delete(deleteIndex);

  }
  // ====== update country ========
  UpdateCountry(cellData) {
    let country = cellData.country;
    let countryCapital = cellData.countryCapital
    let countryCode = cellData.countryCode
    this.dataService.createCountry({ country, countryCapital, countryCode }).subscribe(
      res => {

        this.rowData = [...this.rowData, res.CreateCountry];
       this.observableService.setTosterMsg({
          type: "info",
          title: "Saved",
          message: "Sucessfully saved"
      })
      },

      // this.observableService.setTosterMsg({type: "info", title:"saveed", message:""})
      // err => {
      //   console.log("ls error:", err);
      //   this.toasterService.pop("error", "Server Error", err)
      // }
    )
  }
  // ======edit country =========
  edit(cellData, rowIndex) {

    let country = cellData.country;
    let countryCapital = cellData.countryCapital
    let countryCode = cellData.countryCode
    let countryid = this.rowData[rowIndex].id

    this.dataService.editCountry({ countryid, country, countryCapital, countryCode }).subscribe(
      res => {
        this.rowData[rowIndex] = res.EditCountry;
        this.observableService.setTosterMsg({
          type: "info",
          title: "Edit",
          message: "Sucessfully Editted"
      })
      },
      // err => {
      //   console.log("ls error:", err);
      //   this.toasterService.pop("error", "Server Error", err)
      // }
    )
  }

  // ====== Delete country ======

  delete(rowIndex) {
    console.log("im in delete", rowIndex);
    console.log(this.rowData[rowIndex]);
    let countryId = this.rowData[rowIndex].id
    console.log(countryId);
    this.dataService.deleteCountry(countryId).subscribe(
      res => {

        this.rowData[rowIndex] = res.DeleteCountry
        this.rowData = this.rowData.filter((data) => {
          return data.id !== res.DeleteCountry.id
        });
        setTimeout(() => {
          let lastRec = _.last(this.rowData)

          let currentNode = this.gridApi.getRowNode(lastRec.id)

          currentNode.setSelected(true);
          this.gridApi.ensureIndexVisible(currentNode.rowIndex);
        }, 100);
        this.observableService.setTosterMsg({
          type: "info",
          title: "Delete",
          message: "Sucessfully Deleted"
      })
      },
      // err => {
      //   console.log(err);
      //   this.toasterService.pop("warning", "Server Error", err)
      // }
    )
  }














}
