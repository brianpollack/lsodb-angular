import { Component, OnInit } from "@angular/core";
import { GridApi, ColDef } from "ag-grid-community";
import { GridButtonComponent } from "src/app/ag-grid-components/grid-button/grid-button.component";
import * as _ from "lodash";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PincodeService } from "src/app/services/pincode/pincode.service";
import { ObservableService } from "src/app/services/observable.service";
import { TosterType } from "src/app/enum/enums";
import { Ilocation, IPickLocation } from "./../../../models/place";

@Component({
  selector: "app-pincode-tab",
  templateUrl: "./pincode-tab.component.html",
  styleUrls: ["./pincode-tab.component.scss"],
})
export class PincodeTabComponent implements OnInit {
  private gridApi: GridApi;
  private defaultColDef;
  private rowSelection;
  private gridColumnApi;
  private getRowNodeId;
  private rowData: IPickLocation[];
  private searchPinForm: FormGroup;
  private locationData: IPickLocation;

  frameworkComponents: {
    gridButtonRendender: typeof GridButtonComponent;
  };

  constructor(
    private fb: FormBuilder,
    private pincodeService: PincodeService,
    private observableService: ObservableService
  ) {
    this.frameworkComponents = {
      gridButtonRendender: GridButtonComponent,
    };

    this.rowData = [
      {
        id: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      town: "",
      village: "",
      pincode: "",
      }
    ];

    this.getRowNodeId = (d): string => {
      return d.id;
    };


    this.observableService.navigateTab().subscribe(
      data => {
        if(data.tabName === "PINCODE"){
          console.log("pincode",data);
          let pin =data.pincode
          this.searchPinForm.setValue({
            place: "",
            pin:  pin
           })
        }else {
          console.log("not PINCODE tab!!")
        }
      }
    )
  }

  ngOnInit() {
    this.searchPinForm = this.fb.group({
      place: [""],
      pin: [""],
    });

    // this.initPickLocation();
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
      headerName: "Place",
      field: "village",
      width: 200,
      sortable: true,
    },
    {
      headerName: "Pincode",
      field: "pincode",
      width: 200,
      sortable: true,
    },
     {
      headerName: 'country',
      field: 'country',
      hide: true,
    },
     {
      headerName: 'state',
      field: 'state',
      hide: true,
    },
     {
      headerName: 'district',
      field: 'district',
      hide: true,
    },
     {
      headerName: 'taluk',
      field: 'taluk',
      hide: true,
    },
     {
      headerName: 'town',
      field: 'town',
      hide: true,
    },
    
   

    {
      headerName: "Select",
      field: "select",
      width: 150,
      cellRenderer: "gridButtonRendender",
      cellRendererParams: {
        btnName: "Select",
        onSelect: this.selectTab.bind(this)
      },
    },
  ];

  selectTab(sectedRow){
console.log("hello");
    let formData = {
      country: sectedRow.country,
      state: sectedRow.state,
      district: sectedRow.district,
      taluk: sectedRow.taluk,
      town: sectedRow.town,
      village: sectedRow.village,
      pincode: sectedRow.pincode,
      tabName: "ADD"
    }
    this.observableService.setTab(formData);
  }
  /* ========= set locationData =========== */
  setpickLocationData(data){
    this.locationData = {
      id:"",
      country: data.Country,
      state: data.State,
      district: data.District,
      taluk: data.Block,
      town: "",
      village: data.Name,
      pincode: data.Pincode,
    }
    this.rowData.push(this.locationData);
   
  } 
  /* ============ pick location =========== */
  initPickLocation() {
    this.locationData = {
      id: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      town: "",
      village: "",
      pincode: "",
    };
  }

  /* ============ back tab =========== */
  backTab() {
    let changeData = "ADD";
    this.observableService.setNav(changeData);
  } 


  onSubmit(searchPinDirective) {
    let place = this.searchPinForm.get("place").value;
    let pin = this.searchPinForm.get("pin").value;

    if (pin !== "") {
      // const url = `https://api.postalpincode.in/pincode/${pin}`;

      this.pincodeService.getpincode(pin).subscribe(
        (res) => {
          this.pickLocation(res);
        },
        (err) => {
          this.observableService.setTosterMsg({
            type: TosterType.ERROR,
            title: "Request failed",
            message: err,
          });
        }
      );
    } else {
      console.log(place);
    }
  }

  pickLocation(data) {
    let result = data[0].PostOffice;
    this.rowData = []
    result.forEach(obj => {
      console.log(obj);
      this.setpickLocationData(obj);
    })
    /* result.forEach((e) => {
      this.setpickLocationData(e)
  }); */
  console.log(this.locationData);
  
  }

 
}
