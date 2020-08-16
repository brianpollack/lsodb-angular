import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from "@angular/core";
import { ColDef, GridApi } from "ag-grid-community";
import * as _ from "lodash";
import { ActionBtnComponent } from "src/app/ag-grid-components/action-btn/action-btn.component";
import { GridButtonComponent } from "src/app/ag-grid-components/grid-button/grid-button.component";
import { ObservableService } from "src/app/services/observable.service";
import { IownerView } from "src/app/models/ownerView";
import { OwnerDetailsService } from "src/app/services/graphql/owner-details.service";
import { IOwner } from "./../../graphql/interface/ownerInterface";
import { DiplayImgComponent } from "src/app/ag-grid-components/diplay-img/diplay-img.component";
declare let L;

@Component({
  selector: "app-view-tab",
  templateUrl: "./view-tab.component.html",
  styleUrls: ["./view-tab.component.scss"],
})
export class ViewTabComponent implements OnInit {
  // =================== Variable Initialization ==============
  @Output() navigateTo = new EventEmitter<any>();
  @Output() trackTab = new EventEmitter<any>();

  @Input() tabValue: any;

  map: any;
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  private editIndex;
  private editId;
  private paginationPageSize;
  private paginationNumberFormatter;
  private rowData: IOwner[];
  //IownerView[] |
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent;
    gridButtonRendender: typeof GridButtonComponent;
    diplayImgRender: typeof DiplayImgComponent;
  };

  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent,
      diplayImgRender: DiplayImgComponent,
    };

    this.defaultColDef = {
      autoHeight: true,
    };

    this.rowData = [
      {
        id: "",
        avatar: "",
        oName: "",
        door: "",
        street: "",
        landMark: "",
        pincode: "",
        poPlace: "",
        lat: null ,
        log: null,
        village: "",
        taluk: "",
        town: "",
        district: "",
        state: "",
        country: "",
        adhaar: "",
        pan: "",
        phone: "",
        email: "",
        totalLs: "",
        latR: null,
        logR: null
        // editmode: "",
      },
    ];

    this.rowSelection = "single";
    this.paginationPageSize = 4
    this.getRowNodeId = (d): string => {
      return d.id;
    };
  }

  onSelectionChanged(event) {
    // console.log(event);
    var selectedRows = this.gridApi.getSelectedRows();
    // console.log("selected row", selectedRows);
    let changetab
    if (selectedRows.length === 0) {
       changetab = {
        viewValue: false,
        addValue: false,
        tabName: "LSDATA",
      };
    } else {
       changetab = {
        oId: selectedRows[0].id,
        oName: selectedRows[0].oName,
        viewValue: true,
        addValue: true,
        tabName: "LSDATA",
      };
    }

    // this.navigateTo.emit(changetab);
    this.trackTab.emit(changetab);
  }

  /* onSelectionChanged(){
  gridOptions.checkboxSelection
} */
  /* onRowSelected(event) {
    // console.log(event)
    let selectValue = {
      oId: event.data.id,
      oName: event.data.oName,
      viewValue: true,
      addValue: true,
      tabName: "LSDATA"
    }

    this.trackTab.emit(selectValue);
  } */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes.tabValue.firstChange &&
      Object.keys(changes.tabValue.currentValue).length > 1
    ) {
      // console.log("back tab");
      if (changes.tabValue.currentValue["fromTab"] === "ADD") {
        if (changes.tabValue.currentValue["edit"] === "NEW") {
          this.rowData.push(changes.tabValue.currentValue);
          var res = this.gridApi.updateRowData({
            add: [changes.tabValue.currentValue],
          });
          let currentNode = this.gridApi.getRowNode(
            changes.tabValue.currentValue.id
          );
          currentNode.setSelected(true, true);
          setTimeout(() => {
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 500);
        } else {
          if (this.editId === changes.tabValue.currentValue.id) {
            this.rowData[this.editIndex] = changes.tabValue.currentValue;
            var res = this.gridApi.updateRowData({
              update: [changes.tabValue.currentValue],
            });
          }

          let currentNode = this.gridApi.getRowNode(
            changes.tabValue.currentValue.id
          );
          currentNode.setSelected(true, true);
          setTimeout(() => {
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 500);
        }
      }
      this.onLoad();
    }

  }

  ngOnInit() {
    this.onLoad();
   
  }

  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
  }

  columnDefs: ColDef[] = [
    {
      headerName: "Nos",
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 150,
      sortable: true,
      checkboxSelection: function (params) {
        // console.log(params);
        return true;
      },
    },
    {
      headerName: "Image",
      field: "avatar",
      width: 200,
      sortable: true,
      cellRenderer: "diplayImgRender",
    },
    {
      headerName: "Name",
      field: "oName",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Place",
      field: "poPlace",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Livestock",
      field: "totalLs",
      width: 150,
      sortable: true,
    },

    {
      headerName: "Action",
      // field: "editmode",
      width: 150,
      cellRenderer: "buttonRender",
      cellRendererParams: {
        btn: "edit",
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
    {
      headerName: "door",
      field: "door",
      hide: true,
    },
    {
      headerName: "street",
      field: "street",
      hide: true,
    },
    {
      headerName: "landMark",
      field: "landMark",
      hide: true,
    },
    {
      headerName: "pincode",
      field: "pincode",
      hide: true,
    },
    {
      headerName: "postalPlace",
      field: "village",
      hide: true,
    },
    {
      headerName: "lat",
      field: "lat",
      hide: true,
    },
    {
      headerName: "log",
      field: "log",
      hide: true,
    },
    {
      headerName: "taluk",
      field: "taluk",
      hide: true,
    },
    {
      headerName: "town",
      field: "town",
      hide: true,
    },
    {
      headerName: "district",
      field: "district",
      hide: true,
    },
    {
      headerName: "state",
      field: "state",
      hide: true,
    },
    {
      headerName: "country",
      field: "country",
      hide: true,
    },
    {
      headerName: "adhaar",
      field: "adhaar",
      hide: true,
    },
    {
      headerName: "pan",
      field: "pan",
      hide: true,
    },
    {
      headerName: "phone",
      field: "phone",
      hide: true,
    },
    {
      headerName: "email",
      field: "email",
      hide: true,
    },
  ];

  // ==== On edit button ========
  onEdit(editData: IOwner) {
    this.editId = editData.id;
    this.editIndex = _.findIndex(this.rowData, (obj) => {
      return obj.id === editData.id;
    });
    

    let changetab = {
      ...editData,
      tabName: "ADD",
      fromTab: "VIEW",
    };

    this.navigateTo.emit(changetab);
  }
  //  =========== on Delete button ===============
  onDelete(deleteData: IOwner) {
    const deleteIndex = _.findIndex(this.rowData, (obj) => {
      return obj.id === deleteData.id;
    });

    this.delete(deleteIndex);
  }

  // ========
  /* LivestockTab(sectedRow) {
    let changetab = {
      tabName: "LSDATA",
    };

    this.navigateTo.emit(changetab);
  } */

  // =============== delete data ===========
  delete(rowIndex) {
    let ownerId = this.rowData[rowIndex].id;

    this.dataService.deleteOwner(ownerId).subscribe((res) => {
      this.rowData[rowIndex] = res.DeleteOwner;
      this.rowData = this.rowData.filter((data) => {
        return data.id !== res.DeleteOwner.id;
      });

      setTimeout(() => {
        let lastRec = _.last(this.rowData);
        let currentNode = this.gridApi.getRowNode(lastRec.id);
        currentNode.setSelected(true);
        this.gridApi.ensureIndexVisible(currentNode.rowIndex);
      }, 100);
    });
  }

  /* onAddRow() {
    let changetab = {
      tabName: "ADD",
    };

    this.navigateTo.emit(changetab);
  } */

  onLoad() {
    this.dataService.findAllOwner().subscribe((res) => {
      this.rowData = res.FindAllOwners;
      // console.log( res.FindAllOwners);
    });

    /* this.dataService.findAllOwner().subscribe((res) => {
      this.rowData = res.FindAllOwners;
    }); */
  }
}
