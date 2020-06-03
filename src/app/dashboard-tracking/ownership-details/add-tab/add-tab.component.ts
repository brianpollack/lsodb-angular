import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ObservableService } from "src/app/services/observable.service";
import { validate } from 'graphql';

@Component({
  selector: "app-add-tab",
  templateUrl: "./add-tab.component.html",
  styleUrls: ["./add-tab.component.scss"],
})
export class AddTabComponent implements OnInit {
  private imageURL: string;
  private ownerForm: FormGroup;
  private expand = false;
  private idexpand = false;
  private pinVerified = "Not verify";

  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService
  ) {
    this.observableService.navigateTab().subscribe(
      data => {
        if(data.tabName === "ADD"){
          this.setFormData(data);
        } else{
          console.log("not ADD tab!!")
        }
      })
  }

  ngOnInit() {
    this.ownerForm = this.fb.group({
      avatar: [null],
      onwerName: [""],
      door: [""],
      street: [""],
      landmark: [""],
      pincode: [""],
      place: [ {
        value: "",
        disabled: true,
      },Validators.required],
      postPlace: [""],
      town: [ {
        value: "",
        disabled: true,
      },Validators.required],
      taluk: [ {
        value: "",
        disabled: true,
      },Validators.required],
      district: [
        {
          value: "",
          disabled: true,
        },Validators.required
      ],
      state: [ {
        value: "",
        disabled: true,
      },Validators.required],
      country: [ {
        value: "",
        disabled: true,
      },Validators.required],
      lat: [ {
        value: "",
        disabled: true,
      },Validators.required],
      lag: [ {
        value: "",
        disabled: true,
      },Validators.required],
      verifyPin: [ {
        value: "",
        disabled: true,
      },Validators.required],
      adhaar: [""],
      pan: [""],
      phone: [""],
      email: [""],
    });
  }

  setFormData(data){
    this.ownerForm.setValue({
      avatar: "",
      onwerName: "",
      door: "",
      street: "",
      landmark: "",
      pincode: data.pincode,
      place: "",
      postPlace: data.postvillage,
      town: data.town,
      taluk: data.taluk,
      district: data.district,
      state: data.state,
      country: data.country,
      lat: "",
      lag: "",
      verifyPin: true,
      adhaar: "",
      pan: "",
      phone: "",
      email: "",
    })
    
    this.pincodeVerified();
  }

  // ========== verify pincode ==========
  pincodeVerified() {
    if(this.ownerForm.get("verifyPin").value === true)
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
    console.log(this.ownerForm.value);

    let tabObj = {
      tabName: "VIEW",
    };
    this.observableService.setTab(tabObj);
  }

   // ======== navigate to map tab ===========
  location() {
    
    let tabObj = {
      place: this.ownerForm.get('postPlace').value,
      tabName: "MAP",
    };
    //  let tabName = "MAP";
    
    this.observableService.setTab(tabObj);
  }

  // ======== navigate to pincode tab ===========
  verifypin() {
    let tabObj = {
      pincode: this.ownerForm.get('pincode').value,
      tabName: "PINCODE",
    };
    this.observableService.setTab(tabObj);
  }

  // back tab
  backTab() {
    let changetab = "VIEW";
    this.observableService.setNav(changetab);
  }


}
