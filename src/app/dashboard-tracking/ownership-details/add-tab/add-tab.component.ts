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
import { OwnerDetailsService } from "src/app/services/graphql/owner-details.service";
import {
  IOwner,
  IParamsCreateOwner,
} from "./../../graphql/interface/ownerInterface";
import { TosterType } from "src/app/enum/enums";
import * as _ from "lodash";

@Component({
  selector: "app-add-tab",
  templateUrl: "./add-tab.component.html",
  styleUrls: ["./add-tab.component.scss"],
})
export class AddTabComponent implements OnInit, OnChanges {
  @Output() navigateTo = new EventEmitter<any>();
  @Input() tabValue: any;

  private imageURL: string = "/assets/img/nouser01.svg";
  private ownerForm: FormGroup;
  private expand = false;
  private idexpand = false;
  private pinVerified = "Not verify";
  private isEditMode = false;
  private ownerId;

  private ownerData: IParamsCreateOwner = {
    avatar: "",
    oName: "",
    door: "",
    street: "",
    landMark: "",
    pincode: "",
    poPlace: "",
    lat: null,
    log: null,
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
    latR: null,
    logR: null,
  };
  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes.tabValue.firstChange &&
      Object.keys(changes.tabValue.currentValue).length > 1
    ) {
      if (changes.tabValue.currentValue["fromTab"] === "MAP") {
        this.mapData(changes.tabValue.currentValue);
      } else if (changes.tabValue.currentValue["fromTab"] === "PINCODE") {
        this.picodeData(changes.tabValue.currentValue);
      } else if (changes.tabValue.currentValue["fromTab"] === "VIEW") {
        this.editData(changes.tabValue.currentValue);
      }
    }
  }

  ngOnInit() {
    this.ownerForm = this.fb.group({
      avatar: [""],
      oName: ["", Validators.required],
      door: [""],
      street: [""],
      landMark: [""],
      pincode: ["", Validators.required],
      village: [
        {
          value: "",
          disabled: true,
        },
      ],
      poPlace: [
        {
          value: "",
          disabled: true,
        },
        Validators.required,
      ],
      town: [
        {
          value: "",
          disabled: true,
        },
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
    this.ownerData.avatar = "";
    this.ownerData.oName = "";
    this.ownerData.door = "";
    this.ownerData.street = "";
    this.ownerData.landMark = "";
    this.ownerData.pincode = "";
    this.ownerData.poPlace = "";
    this.ownerData.lat = null;
    this.ownerData.log = null;
    this.ownerData.village = "";
    this.ownerData.taluk = "";
    this.ownerData.town = "";
    this.ownerData.district = "";
    this.ownerData.state = "";
    this.ownerData.country = "";
    this.ownerData.adhaar = "";
    this.ownerData.pan = "";
    this.ownerData.phone = "";
    this.ownerData.email = "";
    this.ownerData.latR = null;
    this.ownerData.logR = null;
  }

  setLocation(data) {
    this.ownerData.avatar = data.avatar;
    this.ownerData.oName = data.oName;
    this.ownerData.door = data.door;
    this.ownerData.street = data.street;
    this.ownerData.landMark = data.landMark;
    this.ownerData.pincode = data.pincode;
    this.ownerData.poPlace = data.poPlace;
    this.ownerData.lat = data.lat;
    this.ownerData.log = data.log;
    this.ownerData.village = data.village;
    this.ownerData.taluk = data.taluk;
    this.ownerData.town = data.town;
    this.ownerData.district = data.district;
    this.ownerData.state = data.state;
    this.ownerData.country = data.country;
    this.ownerData.adhaar = data.adhaar;
    this.ownerData.pan = data.pan;
    this.ownerData.phone = data.phone;
    this.ownerData.email = data.email;
    this.ownerData.latR = _.round(data.lat, 4);
    this.ownerData.logR = _.round(data.log, 4);
    
    
  }

  picodeData(data) {
    this.ownerForm.patchValue({
      pincode: data.pincode,
      poPlace: data.postvillage,
      verifyPin: true,
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
      lat: data.lat * 1,
      log: data.log * 1,
    });

   
  }

  editData(data) {
    this.ownerForm.patchValue({
      avatar: data.avatar,
      oName: data.oName,
      door: data.door,
      street: data.street,
      landMark: data.landMark,
      country: data.country,
      state: data.state,
      district: data.district,
      taluk: data.taluk,
      town: data.town,
      village: data.village,
      lat: data.lat,
      log: data.log,
      pincode: data.pincode,
      poPlace: data.poPlace,
      verifyPin: true,
      adhaar: data.adhaar,
      pan: data.pan,
      phone: data.phone,
      email: data.email,
    });

    this.pincodeVerified();
    this.isEditMode = true;
    this.ownerId = data.id;
  }

  // ========== verify pincode ==========
  pincodeVerified() {
    if (this.ownerForm.get("verifyPin").value === true)
      this.pinVerified = "Verify";
  }

  // ========== accotation =============
  expanded() {
    this.expand = !this.expand;
  }
  //================== Image Preview ================
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // console.log(file);

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;

      this.ownerForm.patchValue({
        avatar: this.imageURL,
      });
      this.ownerForm.get("avatar").updateValueAndValidity();
      // console.log(this.imageURL);
    };
    reader.readAsDataURL(file);

    // console.log(this.ownerForm.get("avatar").value);
  }

  // ======== save submit data ===========
  onSubmit(ownerDirective) {
    if (this.ownerForm.valid) {
      // console.log(this.ownerForm.value);
      if (this.isEditMode) {
        this.setLocation(this.ownerForm.getRawValue());

        this.dataService
          .editOwner(this.ownerId, this.ownerData)
          .subscribe((res) => {
            // console.log(res.EditOwner);
            this.changeTab(res.EditOwner);
          });
      } else {

        this.setLocation(this.ownerForm.getRawValue());
        // console.log(this.ownerForm.get("latR").value);
        // console.log(this.ownerForm.get("logR").value);
        

        this.dataService.createOwner(this.ownerData).subscribe((res) => {
          this.changeTab(res.CreateOwner);
        });
      }
      this.ownerForm.reset();
    } else {
      this.observableService.setTosterMsg({
        type: TosterType.ERROR,
        title: "Reqired Data",
        message: "Please fill all required Data",
      });
    }
  }

  changeTab(data) {
    let editmode = {
      edit: "NEW",
    };
    if (this.isEditMode) {
      editmode = {
        edit: "EDIT",
      };
    }
    let changetab = {
      ...editmode,
      ...data,
      tabName: "VIEW",
      fromTab: "ADD",
    };

    // console.log(data)
    // let changetab = Object.assign({}, data,tabName );

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
