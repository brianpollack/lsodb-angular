import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ObservableService } from "src/app/services/observable.service";
import { validate } from "graphql";
import { OwnerDetailsService } from 'src/app/services/graphql/owner-details.service';
import { IOwner, IParamsCreateOwner } from './../../graphql/interface/ownerInterface';

@Component({
  selector: "app-add-tab",
  templateUrl: "./add-tab.component.html",
  styleUrls: ["./add-tab.component.scss"],
})
export class AddTabComponent implements OnInit, OnChanges {
  @Output() navigateTo = new EventEmitter<any>();
  @Input() tabValue: any;

  private imageURL: string;
  private ownerForm: FormGroup;
  private expand = false;
  private idexpand = false;
  private pinVerified = "Not verify";
  private  ownerData: IParamsCreateOwner  = {
    
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
  };
  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService,
    private dataService: OwnerDetailsService,
  ) {
    /*  this.observableService.navigateTab().subscribe(
      data => {
        if(data.tabName === "ADD"){
          console.log(data);
          this.setLocation(data);
        } else{
          console.log("not ADD tab!!")
        }
      }) */
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (!changes.tabValue.firstChange && Object.keys(changes.tabValue.currentValue).length > 1) {
      
      console.log("fromTab",changes.tabValue.currentValue['fromTab']);
      if(changes.tabValue.currentValue['fromTab'] === 'MAP'){
        console.log("map",changes.tabValue.currentValue)
        this.mapData(changes.tabValue.currentValue);
       
        
      }else if(changes.tabValue.currentValue['fromTab'] === 'PINCODE') {
        
        this.picodeData(changes.tabValue.currentValue)
       
      
      }
     
     
    }
  }

  ngOnInit() {
    this.ownerForm = this.fb.group({
      avatar: [""],
      oName: [""],
      door: [""],
      street: [""],
      landMark: [""],
      pincode: [""],
      village: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      poPlace: [{
        value: "",
        disabled: true,
      },
      Validators.required,],
      town: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      taluk: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      district: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],     
      country: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      lat: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      log: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      verifyPin: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      adhaar: [""],
      pan: [""],
      phone: [""],
      email: [""],
      state: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
    });
  }

  // ============== map initite form data ==============
  initLocation(): void {
    
    this. ownerData.avatar="";
    this. ownerData.oName="";
    this. ownerData.door="";
    this. ownerData.street="";
    this. ownerData.landMark="";
    this. ownerData.pincode="";
    this. ownerData.poPlace="";
    this. ownerData.lat="";
    this. ownerData.log="";
    this. ownerData.village="";
    this. ownerData.taluk="";
    this. ownerData.town="";
    this. ownerData.district="";
    this. ownerData.state="";
    this. ownerData.country="";
    this. ownerData.adhaar="";
    this. ownerData.pan="";
    this. ownerData.phone="";
    this. ownerData.email="";
  }

  setLocation(data) {
    
    this. ownerData.avatar= data.avatar;
    this. ownerData.oName= data.oName;
    this. ownerData.door= data.door;
    this. ownerData.street=data.street;
    this. ownerData.landMark=data.landMark;
    this. ownerData.pincode= data.pincode;
    this. ownerData.poPlace=data.poPlace;
    this. ownerData.lat=data.lat;
    this. ownerData.log=data.log;
    this. ownerData.village=data.village;
    this. ownerData.taluk=data.taluk;
    this. ownerData.town=data.town;
    this. ownerData.district=data.district;
    this. ownerData.state=data.state;
    this. ownerData.country=data.country;
    this. ownerData.adhaar=data.adhaar;
    this. ownerData.pan=data.pan;
    this. ownerData.phone=data.phone;
    this. ownerData.email=data.email;

    // console.log(this. ownerData );
    // // this.setFormValue(this. ownerData );
  }

  picodeData(data) {
    this.ownerForm.patchValue({
      pincode: data.pincode,
      poPlace: data.postvillage,
      verifyPin: true
    });

    this.pincodeVerified();
  }

  mapData(data) {
    
    this.ownerForm.patchValue({
      country: data.country,
      state: data.state,
      district: data.district,
      taluk: data.taluk,
      town: data.town,
      village: data.village,
      lat: data.lat,
      log: data.log,
    })
    
  }

  // ========== verify pincode ==========
  pincodeVerified() {
    console.log(this.ownerForm.get("verifyPin").value)
    if (this.ownerForm.get("verifyPin").value === true)
      this.pinVerified = "Verify";
  }

  // ========== accotation =============
  expanded() {
    console.log(this.expand);
    this.expand = !this.expand;
  }
  //================== Image Preview ================
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.ownerForm.patchValue({
      avatar: file,
    });
    this.ownerForm.get("avatar").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);

    console.log(this.imageURL);
  }

  // ======== save submit data ===========
  onSubmit(ownerDirective) {
    // console.log(this.ownerForm.getRawValue());
    this.setLocation(this.ownerForm.getRawValue());
    this.dataService.createOwner(this.ownerData).subscribe(
      res => {
        // console.log(res.CreateOwner);
        this.changeTab(res.CreateOwner)
      }
    )

    // this.ownerForm.reset();
  }

  changeTab(data) {
    let changetab = {
      tabName: "VIEW",
      fromTab: "ADD",
      ...data
    };
   // let changetab = Object.assign({}, data,tabName ); 
    console.log("change",changetab);
   

    this.navigateTo.emit(changetab);



  }
  // ======== navigate to map tab ===========
  location() {
    let changetab = {
      place: this.ownerForm.get("poPlace").value,
      tabName: "MAP",
    };

    this.navigateTo.emit(changetab);
  }

  // ======== navigate to pincode tab ===========
  verifypin() {
    let changetab = {
      pincode: this.ownerForm.get("pincode").value,
      tabName: "PINCODE",
    };
    this.navigateTo.emit(changetab);
  }

  // back tab
  backTab() {
    let changetab = {
      tabName: "VIEW",
    };

    this.navigateTo.emit(changetab);
  }
}
