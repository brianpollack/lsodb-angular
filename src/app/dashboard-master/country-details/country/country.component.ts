import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ActionBtnComponent } from '../../../ag-grid-components/action-btn/action-btn.component'
import { ColDef } from 'ag-grid-community';
import { CountryService } from './../../../services/graphql/country.service';
import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';
import { ICountry } from './../../grphql/interface/countryInterface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  private gridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId
  private rowData: ICountry[];
  private showMenu: boolean = false;
  private hide = true;
  frameworkComponents: { buttonRender: typeof ActionBtnComponent; };
  isEditMode: boolean = false;
  editRecordId: any;
  editBtnClicked: boolean;
  showUniqueErr: boolean;

  constructor(
    private fb: FormBuilder,
    private dataService: CountryService,
    private toasterService: ToasterService) {
    this.frameworkComponents = {
      buttonRender: ActionBtnComponent
    }
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

  // CountryForm = this.fb.group({
  //   countryName: ["", Validators.required],
  //   countryCapital: ["", [Validators.required]],
  //   countryCode: ["", [Validators.required]]
  // })

  columnDefs: ColDef[] = [
    {
      headerName: 'Nos',
      // field: 'id',
      valueGetter: "node.rowIndex + 1",
      width: 100,
      sortable: true
    },
    {
      headerName: 'Country Name',
      field: 'country',
      width: 200,
      sortable: true
    },
    {
      headerName: 'Country Capital',
      field: 'countryCapital',
      width: 200,
      sortable: true
    },
    {
      headerName: 'Country Code',
      field: 'countryCode',
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

  // ====== Unique ===================
  
  isUnique(country: string): boolean {
    const findedValue = this.rowData.findIndex((obj: ICountry) => {
      return obj.country !== country ;  
    });
    console.log(findedValue)
    return findedValue === -1 ? true : false;
  }

  // ====== on grid ready =========
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.selectIndex(0, false, false);
  }


  // ====== update country ========
  UpdateCountry(rowIndex) {
    let country = _.upperFirst(this.CountryForm.value.countryName);
    let countryCapital = _.upperFirst(this.CountryForm.value.countryCapital);
    let countryCode =_.upperFirst( this.CountryForm.value.countryCode);

    this.dataService.createCountry({ country, countryCapital, countryCode }).subscribe(
      res => {
        
        if (rowIndex === 0) {
          this.rowData[rowIndex] = res.CreateCountry
        } else {
          this.rowData = [...this.rowData, res.CreateCountry]
        }
       

      },

      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }

    )
  }
  // ======edit country =========
  edit(rowIndex) {

    let country = _.upperFirst(this.CountryForm.value.countryName);
    let countryCapital = _.upperFirst(this.CountryForm.value.countryCapital);
    let countryCode =_.upperFirst( this.CountryForm.value.countryCode);
    let countryid = this.rowData[rowIndex].id

    this.dataService.editCountry({ countryid, country, countryCapital, countryCode }).subscribe(
      res => {
        
        this.rowData[rowIndex] = res.EditCountry;
       
        let currentNode = this.gridApi.getRowNode(this.rowData[rowIndex].id);
        currentNode.setDataValue("country", _.upperFirst(country));
        currentNode.setDataValue("countryCapital",_.upperFirst( countryCapital));
        currentNode.setDataValue("countryCode", _.upperFirst(countryCode));
      
      },
      err => {
        console.log("ls error:", err);
        this.toasterService.pop("error", "Server Error", err)
      }
    )
  }

  // ====== Delete country ======

  delete(rowIndex) {

    let countryId = this.rowData[rowIndex].id
    this.dataService.deleteCountry(countryId).subscribe(
      res => {
       
        this.rowData[rowIndex] = res.DeleteCountry
        this.rowData = this.rowData.filter((data) => {

          // return data.livestockName !== res.DeleteLivestock.livestockName
          return data.id !== res.DeleteCountry.id
        });
        setTimeout(() => {
          let lastRec = _.last(this.rowData)
        
          let currentNode = this.gridApi.getRowNode(lastRec.id)
         
          currentNode.setSelected(true);
          this.gridApi.ensureIndexVisible(currentNode.rowIndex);
        }, 100);
      },
      err => {
        
        this.toasterService.pop("warning", "Server Error", err)
      }
    )
  }


  // ====== on Submit =========
  onSubmit(countryDirective: FormGroupDirective) {
    if(this.CountryForm.valid){

      const country = _.upperFirst(this.CountryForm.value.country);
      let countryCapital = _.upperFirst(this.CountryForm.value.countryCapital);
      let countryCode =_.upperFirst( this.CountryForm.value.countryCode);
      if (this.isUnique(country)) {
        this.showUniqueErr = false;
        console.log(this.showUniqueErr);
      if(this.isEditMode){
        const index = _.findIndex(this.rowData, (obj) => {
          return obj.id === this.editRecordId;
        })
        this.edit(index);

      }else{
        // ==== new mode acton ====
        let rowLength = this.rowData.length;
       
        // this.rowData[0].country === ''
        if (rowLength === 1  ) {
          let currentRow = this.gridApi.getRowNode(0);
         
          this.UpdateCountry(currentRow);
        }else {
          // ====== new record ===========
         
          this.UpdateCountry(-1)

          setTimeout(() => {
            let lastRec = _.last(this.rowData)
           
            let currentNode = this.gridApi.getRowNode(lastRec.id)
           
            currentNode.setSelected(true);
            this.gridApi.ensureIndexVisible(currentNode.rowIndex);
          }, 100);
        }
      }
    }
    else{
      this.showUniqueErr = true;
    }
    }else{
      console.log("im not valid");
    }

  
    countryDirective.resetForm();

  }


// ====== Edit data ===================
onEdit(editData: ICountry): void {

  this.showMenu = true;
  this.isEditMode = true;
  this.editRecordId = editData.id;
  
  this.CountryForm.setValue({
    countryName: editData.country,
    countryCapital: editData.countryCapital,
    countryCode: editData.countryCode
  });
  this.editBtnClicked = true;

  // this.userField.nativeElement.focus();
}

onDelete(deleteData: ICountry): void {

  
  const deleteIndex = _.findIndex(this.rowData, (obj) => {
    return obj.id === deleteData.id;
  });
  let selectedRow = this.gridApi.getRowNode(deleteIndex)
  this.delete(deleteIndex);

}

}
