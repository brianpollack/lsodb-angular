import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { GridApi, ColDef } from "ag-grid-community";
import { ActionBtnComponent } from "src/app/ag-grid-components/action-btn/action-btn.component";
import { GridButtonComponent } from "src/app/ag-grid-components/grid-button/grid-button.component";
import * as _ from "lodash";
import { FormBuilder } from "@angular/forms";
import { MasterfileService } from "src/app/services/graphql/masterfile.service";
import { FormGroup } from "@angular/forms";
import { GridSelectComponentComponent } from "./../../../ag-grid-components/drop-box/grid-select-component.component";
import { ObservableService } from "src/app/services/observable.service";
import { LivestockDetailsComponent } from "./../../../dashboard-master/livestock-details/livestock-details.component";
import { LivestockSelectComponent } from "./../../../ag-grid-components/drop-box/livestock-select/livestock-select.component";
import { BreedSelectComponent } from "./../../../ag-grid-components/drop-box/breed-select/breed-select.component";
import { Ownlivestock } from '../../graphql/interface/ownerInterface';
import { ILsData } from 'src/app/models/ownerView';
import { OwnerDetailsService } from 'src/app/services/graphql/owner-details.service';

@Component({
  selector: "app-lsdata-tab",
  templateUrl: "./lsdata-tab.component.html",
  styleUrls: ["./lsdata-tab.component.scss"],
})
export class LsdataTabComponent implements OnInit {
  @ViewChild("lsList", { static: false }) lslistField: ElementRef;
  @ViewChild("breedList", { static: false }) breedlistField: ElementRef;

 
  @Output() navigateTo = new EventEmitter<any>();
  @Input() tabValue: any;
  
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;

  oId: string;

  private lsListValue: string;
  livestocksLists: any;
  livestockId: string;
  rowData: ILsData[] | Ownlivestock[] ;
// 
  breedLists: any;

  lsbreedForm: FormGroup;

  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent;
    gridButtonRendender: typeof GridButtonComponent;
    livestockSelect: typeof LivestockSelectComponent;
    breedSelect: typeof BreedSelectComponent;
  };


  constructor(
    private fb: FormBuilder,
    private dataService: MasterfileService,
    private observableService: ObservableService,
    private ownerService: OwnerDetailsService
  ) {
    this.livestocksLists = [];
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent,
      livestockSelect: LivestockSelectComponent,
      breedSelect: BreedSelectComponent,
      // gridSelectRender: GridSelectComponentComponent,
    };

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };

    this.rowData = [
      {
        id: "",
        lsName: "",
        breedName: "",
        lsCount: "",
        ownerId: "",
        editmode: "",
        breedList: []
      },
    ];

    this.getRowNodeId = (d): string => {
      return d.id;
    };
   
  }

ngOnChanges(changes:SimpleChanges): void {

  this.oId = changes.tabValue.currentValue["oId"];
  this.LivestockList();
  this.getRowData();
  // console.log(this.ownerId);
 /* this.ownerService.findAllOwnersLs(ownerId).subscribe(
    res => {
      console.log(res.FindAllOwnersLs)     
    }
  )  */
  
}

  ngOnInit() {
    /* this.lsbreedForm = this.fb.group({
      lsNameList: [""],
      breedNameList: [""],
    }); */
    

  
    this.LivestockList();
  }

  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
  }

  getRowData(){
    let ownerId = this.oId;
    this.ownerService.findAllOwnersLs(ownerId).subscribe(
      res => {
        // console.log(res.FindAllOwnersLs) 
        this.rowData =  res.FindAllOwnersLs 
        // this.rowData.push(res.FindAllOwnersLs)
        // console.log("ls rowData",this.rowData);    
        // this.observableService.setls(this.rowData);
      })
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
      headerName: "Livestock",
      field: "lsName",
      width: 200,
      sortable: true,
      cellRenderer: "livestockSelect",
      cellRendererParams: {
        list: this.livestocksLists,
        onDrop: this.onselectls.bind(this),
      },
      
    },
    {
      headerName: "Breed",
      field: "breedName",
      width: 200,
      sortable: true,
      // editable: true,
      // cellEditor: 'agRichSelectCellEditor',
      // cellRendererParams: {
      //   values : this.getBreedList.bind(this)
      // }
      cellRenderer: "breedSelect",
      // cellRendererParams: {
      //   list: this.breedLists,
      //   onDrop: this.onselectbreed.bind(this),
      // },
      //  cellRendererSelector: this.cellSelector.bind(this)
      
    },
    {
      headerName: "Livestock count",
      field: "lsCount",
      width: 150,
      sortable: true,
      editable: true,
      valueSetter: function (params) {
        // console.log(params);
        params.data.lsCount = params.newValue;
        return true;
      },
    },

    {
      headerName: "ownerID",
      field: "ownerId",
      hide: true
    },

    {
      headerName: "Action",
      field: "editmode",
      width: 150,
      cellRenderer: "buttonRender",
      cellRendererParams: {
        btn: "save",
        onEdit: this.onSave.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
  ];

  /* onChange(e) {
    let LivestockID = e.value;

  } */

  getBreedList(param){
    const breedList = this.livestocksLists.find( e => e.livestockName  === param.data.lsName);
    console.log(breedList.breeds.map( e => e.breedName));
    return breedList.breeds.map( e => e.breedName);
  }

  cellSelector(param){
      var breadRen = {
        cellEditor: 'agRichSelectCellEditor',
        cellRendererParams: {
          values : this.getBreedList.bind(this)
        }
    };
    return breadRen;
  }

  onselectls(e) {
    this.breedLists = e.livestockName;
    // console.log("in lsdata comp ",e);
    // this.BreedList(e);
  }

  onselectbreed(e){
    // console.log(e)
  }

 
  //====== livestock List =========
  LivestockList() {
    this.dataService.findAll().subscribe((result) => {
      this.livestocksLists = result.FindAllLivestock;
      // console.log(this.livestocksLists);

      this.observableService.setls(this.livestocksLists);
    });
  }

  onChange(e) {
    let livestockId = e.value;
    this.BreedList(livestockId);
  }

  //====== livestock List =========
  BreedList(livestockId) {
    
    this.dataService.findOnlyBreeds(livestockId).subscribe((result) => {
      // console.log(result);
      this.breedLists = result.FindAllLivestockBreeds;
      // console.log(this.breedLists);

      this.observableService.setList(this.breedLists);
    });
  }

  backTab(){
    let changetab = {
      tabName: "VIEW",
    };

    this.navigateTo.emit(changetab);
  }
   // ============ new row data =============
  createNewRowData() {
    let newData = {
      id: "",
      lsName: "",
      breedName: "",
      lsCount: "",
      ownerId: "",
      editmode: ""
    }

    return newData;
  }

  // ======= adding new row =================
  onAddRow() {
    this.gridApi.deselectAll()
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
  
    // console.log(res);

    let currentNode = this.gridApi.getRowNode(newItem.id)
    // console.log(currentNode);
   ;
    currentNode.setSelected(true, true);
    this.gridApi.ensureIndexVisible(currentNode.rowIndex);
    this.LivestockList();
    return res;
  } 

 
  // =========== save data
  onSave(editData: Ownlivestock ) {
   
    // console.log("save data",editData )
    let currentNode = this.gridApi.getRowNode(editData.id);

    if(currentNode.id !== ""){
      // console.log("edit")
      this.editList(editData, currentNode.rowIndex);
    } else {
      // console.log("new")
      this.createList(editData);
    
    }

    this.gridApi.deselectAll()
  }

  onDelete(deleteData: Ownlivestock){
    let deleteIndex = this.gridApi.getRowNode(deleteData.id).rowIndex;
//  console.log(deleteIndex)
    // this.delete(deleteIndex);
  }
  createList(cellData) {
    let lsName = cellData.lsName ;
    let breedName = cellData.breedName;
    let lsCount = cellData.lsCount;
    let ownerId= this.oId;

    this.ownerService.creatOLivestock({lsName, breedName, lsCount, ownerId} ).subscribe(
      (res:any) => {
        this.rowData = res.CreateOwnLivestock 
      // this.rowData.push(res.CreateOwnLivestock)
      // var result = this.gridApi.updateRowData({
      //   add: [res.CreateOwnLivestock],
      // });
      console.log( this.rowData )
        console.log(res.CreateOwnLivestock);
        this.observableService.setTosterMsg({
          type: "info",
          title: "Saved",
          message: "Sucessfully saved"
        })
      
      }
    )
    
  }

  editList(cellData, rowIndex ){

    let lsName = cellData.lsName ;
    let breedName = cellData.breedName;
    let lsCount = cellData.lsCount;
    let ownerId= cellData.ownerId;
    let ownLsId = this.oId

    this.ownerService.editOLivestock(ownLsId, {lsName, breedName, lsCount, ownerId, ownLsId}).subscribe(
    res => {
      this.rowData[rowIndex] = res.EditOwnLivestock
      this.observableService.setTosterMsg({
        type: "info",
        title: "Edit",
        message: "Sucessfully Editted"
      })
    }  
    )
  }

 /*  delete() {
    let ownerId= cellData.ownerId;
    let ownLsId = this.rowData[rowIndex].id
  } */

}
