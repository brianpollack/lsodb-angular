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
  private country;
  private state;
  private district;
  private taluk;
  private town;
  private village;
  private pincode;

  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService
  ) {
    this.observableService.navigateTab().subscribe(
      data => {
        if(data.tabName === "ADD"){
          console.log("object", data);
          this.pincodeVerified();

          this.setFormData(data);
          this.country = data.country;
          this.state = data.state;
          this.district = data.district;
          this.taluk = data.taluk;
          this.town = data.town;
          this.village = data.village;
          this.pincode = data.pincode;
        } else{
          console.log("not ADD tab!!")
        }
      })
   
      
     /*  this.ownerForm.setValue({
        country:  this.country,
        state: this.state,
        district: this.district,
        taluk: this.taluk,
        town: this.town,
        postPlace: this.village,
      }) */
      
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
    console.log("from select field", data)
    console.log(this.ownerForm.value);
    this.ownerForm.setValue({
      avatar: "",
      onwerName: "",
      door: "",
      street: "",
      landmark: "",
      pincode: data.pincode,
      place: "",
      postPlace: data.village,
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
    
  }
  pincodeVerified() {
    console.log(this.ownerForm.get("verifyPin").value);
    this.pinVerified = "Verify";
  }

  expanded() {
    console.log(this.expand);
    this.expand = !this.expand;
  }
  // Image Preview
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

  onSubmit(ownerDirective) {
    console.log(this.ownerForm.value);

    let tabObj = {
      tabName: "VIEW",
    };
    this.observableService.setTab(tabObj);
  }

  location() {
    
     let tabName = "MAP";
    
    this.observableService.setNav(tabName);
  }

  verifypin() {
    let tabObj = {
      pincode: this.ownerForm.get('pincode').value,
      tabName: "PINCODE",
    };
    this.observableService.setTab(tabObj);
  }

  backTab() {
    let changetab = "VIEW";
    this.observableService.setNav(changetab);
  }


}
