import { Component, OnInit } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from 'src/app/ag-grid-components/grid-button/grid-button.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-lsdata-tab',
  templateUrl: './lsdata-tab.component.html',
  styleUrls: ['./lsdata-tab.component.scss']
})
export class LsdataTabComponent implements OnInit {

  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  frameworkComponents: {
    buttonRender: typeof ActionBtnComponent,
    gridButtonRendender: typeof GridButtonComponent
  };
  constructor() {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent,
      gridButtonRendender: GridButtonComponent
    }

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      editable: true,
      resizable: true,
    };

    // this.rowData = [
    //   {
    //     id: "",
    //     livestock: "",
    //     breed: "",
    //     lscount: "",
    //     editMode: "",
    //   }
    // ];

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
      headerName: 'Livestock',
      field: 'livestock',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.state = _.startCase(params.newValue);
        return true;
      },

    },
    {
      headerName: 'Breed',
      field: 'breed',
      width: 200,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.state = _.startCase(params.newValue);
        return true;
      },

    },
    {
      headerName: 'Livestock count',
      field: 'lscount',
      width: 150,
      sortable: true,
      valueSetter: function (params) {
        console.log(params);
        params.data.stateCode = params.newValue;
        return true;
      },
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: [
          'Bob',
          'Harry',
          'Sally',
          'Mary',
          'John',
          'Jack',
          'Sue',
          'Sean',
          'Niall',
          'Albert',
          'Fred',
          'Jenny',
          'Larry',
        ],
      },
    },

    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        btn: "save",
        // onEdit: this.onSave.bind(this),
        // onDelete: this.onDelete.bind(this),
      }
    },
  ];

}
