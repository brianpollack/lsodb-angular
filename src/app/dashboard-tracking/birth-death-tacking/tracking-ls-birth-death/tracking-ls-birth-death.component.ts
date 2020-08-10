import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from "@angular/core";
import { GridApi, ColDef } from "ag-grid-community";
import { ActionBtnComponent } from "src/app/ag-grid-components/action-btn/action-btn.component";
import { ObservableService } from "src/app/services/observable.service";
import { OwnerDetailsService } from "src/app/services/graphql/owner-details.service";

@Component({
  selector: "app-tracking-ls-birth-death",
  templateUrl: "./tracking-ls-birth-death.component.html",
  styleUrls: ["./tracking-ls-birth-death.component.scss"],
})
export class TrackingLsBirthDeathComponent implements OnInit {
  @Output() changeTab = new EventEmitter<any>();
  @Input() tabData: any;
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  private rowData: any;
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent;
  };
  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
    };

    this.defaultColDef = {
      autoHeight: true,
    };

    this.rowData = [{}];
    this.rowSelection = "single";
    this.getRowNodeId = (d): string => {
      return d.id;
    };
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("navigated BD",changes);
    if (
      !changes.tabData.firstChange &&
      Object.keys(changes.tabData.currentValue).length > 1
    ){
      this.rowData = changes.tabData.currentValue.lsDetails
      console.log(this.rowData);
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
    },
    {
      headerName: "Livestock Name",
      field: "lsName",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Breeds Name",
      field: "breedName",
      width: 150,
      sortable: true,
    },
    {
      headerName: "count",
      field: "lsCount",
      width:150,
      sortable: true
    },
    {
      headerName: "Birth",
      field: "birth",
      width: 150,
      
      editable:true
    },
    {
      headerName: "Death",
      field: "death",
      width: 150,
      editable:true
    },
    {
      headerName: "Action",
      width: 150,
      cellRenderer: "buttonRender",
      cellRendererParams: {
        btn: "save",
        onEdit: this.onSave.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
  ];

  onSave(data){

    let ownLsId;
    let ownerId;
    let birth;

    // this.dataService.creatLivespan().subscribe()
  }
  onDelete(data){
    console.log(data)
  }


}
