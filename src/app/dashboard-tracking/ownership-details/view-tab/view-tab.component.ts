import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import * as _ from 'lodash';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import { ObservableService } from 'src/app/services/observable.service';
declare let L;

@Component({
  selector: 'app-view-tab',
  templateUrl: './view-tab.component.html',
  styleUrls: ['./view-tab.component.scss']
})
export class ViewTabComponent implements OnInit {

  map: any
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };
  rowData: { id: string; ownerAvatar: string; state: string; stateCapital: string; stateCode: string; pincode: string; editMode: string; }[];
  constructor(
    private observableService: ObservableService
  ) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent
    }

    this.rowData = [
      {
        id: "",
        ownerAvatar: "",
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

  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true,

    }, {
      headerName: 'Image',
      field: 'ownerAvatar',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.state = _.startCase(params.newValue);
        return true;
      },

    },
    {
      headerName: 'Name',
      field: 'ownerName',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.state = _.startCase(params.newValue);
        return true;
      },

    },
    {
      headerName: 'Place',
      field: 'place',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCapital = _.upperFirst(params.newValue);

        return true;
      }
    },
    {
      headerName: 'Livestock',
      field: 'lscount',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCode = _.toUpper(params.newValue);

        return true;
      }
    },

    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        btn: "edit",
        // onEdit: this.onSave.bind(this),
        // onDelete: this.onDelete.bind(this),
      }
    },
    // {
    //   headerName: 'Action',
    //   field: 'editmode',
    //   width: 150,
    //   cellRenderer: 'gridButtonRendender',
    //   cellRendererParams: {
    //     btnName: "Livestock",
    //     onSelect: this.LivestockTab.bind(this)
    //   }
    // }


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
    let tabObj = {
      tabName: "LSDATA"
    }
    this.observableService.setNav(tabObj);
  }

  onAddRow() {
   
      let changetab = "ADD";   
    this.observableService.setNav(changetab);
  }

 

}
