import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CountryService } from './../../../services/graphql/country.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IState } from '../../grphql/interface/countryInterface';
import { ActionBtnComponent } from 'src/app/ag-grid-components/action-btn/action-btn.component';
import { ICountry } from './../../grphql/interface/countryInterface';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {


  @ViewChild('stateName', {static: false}) inputField : ElementRef
  @ViewChild('list', {static: false}) listField : ElementRef
  // variable declaration
  frameworkComponents: any;
  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  rowData: IState[];
  private isEditMode: boolean;
  private editRecordId: string;
  private showUniqueErr: boolean;
  private rowLength: number;



  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  countryLists: any;

  constructor(
    private fb: FormBuilder,
    private dataService: CountryService,
    private toasterService: ToasterService
  ) {

    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
    this.rowSelection = 'single';
    this.isEditMode = false;
    this.showUniqueErr = false;
    this.rowLength = 0;


    this.rowData = [
      {
        id: "",
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

    this.countryLists = [

      {
        id: "",
        country: "",
        countryCapital: "",
        countryCode: "",
        editMode: ""
      }

    ];
  }

  ngOnInit() {
    this.countryList();
  }

  // ========= State form group ===========
  StateForm = this.fb.group({
    countryList: ["", Validators.required],
    stateName: ["", Validators.required],
    stateCapital: ["", Validators.required],
    stateCode: ["", Validators.required],
    statePin: ["", Validators.required],

  });

   //  ========= coloum defenition =============
   columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true
    },
    {
      headerName: 'State Name',
      field: 'state',
      width: 200,
      sortable: true
    },
    {
      headerName: 'State Capital',
      field: 'stateCapital',
      width: 200,
      sortable: true
    },
    {
      headerName: 'State Code',
      field: 'stateCode',
      width: 150,
      sortable: true
    },
    {
      headerName: 'State Pin Code',
      field: 'statePin',
      width: 150,
      sortable: true
    },
    {
      headerName: 'Action',
      field: 'editmode',
      width: 150,
      cellRenderer: 'buttonRender',
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      }
    }


  ];

  // ============= grid Ready============
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onReset() {
    this.StateForm.reset({
      stateName: this.StateForm.value.stateName,
      stateCapital: this.StateForm.value.stateCapital,
      stateCode: this.StateForm.value.stateCode,
      statePin: this.StateForm.value.statePin
    })
    // console.log( " form value",this.lsDetailsForm.value)
  }

  //====== livestock List =========
  countryList() {
  this.dataService.findAllCountry().subscribe(
    result => {
      this.countryLists = result.FindAllCountry
    }
    )
    console.log(this.countryLists);
}
  
  // ========== onchange select ========
  onChange(e) {
    // console.log(e)
   let countryId = e.value;
    
  // console.log(typeof( livestockId));
    this.dataService.FindAllCountryStates( countryId ).subscribe(
      result => {
        console.log(result);
        this.rowData = result.FindAllCountryStates
        this.rowLength = this.rowData.length;
        // console.log(this.rowData);
      }
    )
    this.inputField.nativeElement.focus();
    // this.StateForm.get('lsName').clearValidators();
    
  }
// ======== check unique ============
// isUnique(selectedValue: string): boolean {
//   const findedValue = this.rowData.findIndex((obj) => {
//     return obj.breedName === selectedValue;

//   });
//   // console.log(findedValue)
//   return findedValue === -1 ? true : false;
// }


// updateCountry(){
  
// }
// onsubmit()


// =========== edit button =============
  onEdit(editData: IState): void {

    const lsList = this.StateForm.value.countryList;
     this.isEditMode = true;
     this.editRecordId = editData.id;
     
     this.StateForm.setValue({
      stateName: editData.state,
      stateCapital: editData.stateCapital,
      stateCode: editData.stateCode,
      statePin: editData.pincode,
    });
     console.log("edit", editData);
     this.inputField.nativeElement.focus();
    
   }
   
   
   //  ========= Delete data ===============
   onDelete(deleteData: IState): void {
     const lsList = this.StateForm.value.countryList;
    //  const deleteIndex = _.findIndex(this.rowData, (obj) => {
    //    return obj.id === deleteData.id;
    //  })
    // this.DeleteBreed(deleteIndex, lsList);
     // this.rowLength = this.rowData.length
   }

}
