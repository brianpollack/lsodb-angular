import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.scss']
})
export class AddTabComponent implements OnInit {

  imageURL: string;
  ownerForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService
  ) { }

  ngOnInit() {
    this.ownerForm = this.fb.group({
      avatar: [null],
      onwerName: [""],
      door: [""],
      street: [""],
      landmark: [""],
      pincode: [""],
      place: [""],
      town: [""],
      taluk: [""],
      district: [""],
      state: [""],
      country: [""],
      lat: [""],
      lag: [""],
    })
  }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.ownerForm.patchValue({
      avatar: file
    });
    this.ownerForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)

    console.log(this.imageURL)
  }

  onSubmit(ownerDirective) {
    console.log(this.ownerForm.value)

    let tabObj = {
      tabName: "VIEW"
    }
    this.observableService.setTab(tabObj);

  }

  location() {
    let tabObj = {
      tabName: "MAP"
    }
    this.observableService.setTab(tabObj);
  }

  verifypin() {
    let tabObj = {
      tabName: "PINCODE"
    }
    this.observableService.setTab(tabObj);
  }

}
