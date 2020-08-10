import { Component, OnInit, SimpleChanges, Output, EventEmitter, Input } from "@angular/core";
import { GridApi, ColDef } from "ag-grid-community";
import { GridButtonComponent } from "src/app/ag-grid-components/grid-button/grid-button.component";
import { DiplayImgComponent } from "src/app/ag-grid-components/diplay-img/diplay-img.component";
import { ObservableService } from "src/app/services/observable.service";
import { OwnerDetailsService } from "src/app/services/graphql/owner-details.service";

@Component({
  selector: "app-find-owner",
  templateUrl: "./find-owner.component.html",
  styleUrls: ["./find-owner.component.scss"],
})
export class FindOwnerComponent implements OnInit {

  @Output() changeTab = new EventEmitter<any>();
  @Input() tabData: any;
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  private paginationPageSize;
  private paginationNumberFormatter;
  private rowData: any;
  frameworkComponents: {
    gridButtonRendender: typeof GridButtonComponent;
    diplayImgRender: typeof DiplayImgComponent;
  };

  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {
    this.frameworkComponents = {
      gridButtonRendender: GridButtonComponent,
      diplayImgRender: DiplayImgComponent,
    };

    this.defaultColDef = {
      autoHeight: true,
    };

    this.rowSelection = "single";
    this.paginationPageSize = 4;
    this.getRowNodeId = (d): string => {
      return d.id;
    };
    this.rowData = [{}];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("navigated",changes);
    if (
      !changes.tabData.firstChange &&
      Object.keys(changes.tabData.currentValue).length > 1
    ){
      if(changes.tabData.currentValue["tabName"] === "FIND"){
        this.getOwners(changes.tabData.currentValue);
      }
    }

  }


  ngOnInit() {}

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
        console.log(params);
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
      cellRenderer: "gridButtonRendender",
      cellRendererParams: {
        btnName: "Select",
        onSelect: this.selectTab.bind(this),
      },
    },
 
  ];

  getOwners(data){
    let page = 1
    let limit = this.paginationPageSize
    let latR = data.lat
    let logR = data.lng

    this.dataService.SearchOwner({page, limit, latR, logR}).subscribe(
      (res) => {
        console.log(res.SearchOwner)
        this.rowData = res.SearchOwner;
      
    })

  }

  selectTab(sectedRow){

    console.log(sectedRow)
    let tabDetails = {
      id: sectedRow.id,
      lsDetails: sectedRow.ownLivestocks,
      tabName: "TRACK"
    }

    this.changeTab.emit(tabDetails);
  }
}
