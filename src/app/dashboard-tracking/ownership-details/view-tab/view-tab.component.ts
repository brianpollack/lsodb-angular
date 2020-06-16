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
declare let L;

@Component({
  selector: "app-view-tab",
  templateUrl: "./view-tab.component.html",
  styleUrls: ["./view-tab.component.scss"],
})
export class ViewTabComponent implements OnInit {
  @Output() navigateTo = new EventEmitter<any>();
  @Input() tabValue: any;

  map: any;
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  private rowData: IownerView[] | IOwner[];
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent;
    gridButtonRendender: typeof GridButtonComponent;
  };

  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent,
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
        lat: "",
        log: "",
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
        lscount: "",
        editmode: "",
      },
    ];

    this.getRowNodeId = (d): string => {
      return d.id;
    };
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("view", changes);
    if (
      !changes.tabValue.firstChange &&
      Object.keys(changes.tabValue.currentValue).length > 1
    ) {
      // setTimeout(() => {
        
        this.rowData.push( changes.tabValue.currentValue);
      //  let updateRow = this.gridApi.setRowData(this.rowData)
      var res =this.gridApi.updateRowData({ add: [changes.tabValue.currentValue] });
        console.log("view value",this.rowData);
       
      // }, 1000);
      // this.onLoad();
      let currentNode = this.gridApi.getRowNode(changes.tabValue.currentValue.id)
      currentNode.setSelected(true, true);
      
      this.gridApi.ensureIndexVisible(currentNode.rowIndex);
    }

    console.log("row Data",this.rowData)
  }

  ngOnInit() {
    this.dataService.findAllOwner().subscribe((res) => {
      this.rowData = res.FindAllOwners;
    });
  }

  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
  }
  columnDefs: ColDef[] = [
    {
      headerName: "Nos",
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true,
    },
    {
      headerName: "Image",
      field: "avatar",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Name",
      field: "oName",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Place",
      field: "village",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Livestock",
      field: "lscount",
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCode = _.toUpper(params.newValue);

        return true;
      },
    },

    {
      headerName: "Action",
      field: "editmode",
      width: 150,
      cellRenderer: "buttonRender",
      cellRendererParams: {
        btn: "edit",
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
      field: "poPlace",
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

  /*  stateTab(sectedRow) {
     if(sectedRow.id !== ""){
     console.log(sectedRow);
     let countryDetails = {
       tabName: "ADD"
     }
 
     this.observableService.setTab(countryDetails);
   }else{
     this.observableService.setTosterMsg({
       type: "warning",
         title: "Save Data!",
         message: "Before entering the District tab Save all data!"
     })
   }
   } */

  LivestockTab(sectedRow) {
    let changetab = {
      tabName: "LSDATA",
    };

    this.navigateTo.emit(changetab);
  }

  onAddRow() {
    let changetab = {
      tabName: "ADD",
    };

    this.navigateTo.emit(changetab);
  }

  onLoad() {
    console.log("loaded data")
    this.dataService.findAllOwner().subscribe((res) => {
      this.rowData = res.FindAllOwners;
    });
  }
}
