import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CustomValidators  } from 'ngx-custom-validators'

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  pageTitle: string = '';
  // loginForm: FormGroup;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.pageTitle = this.activeRouter.params.value.pageName;
    // console.log();
    // this.formInit();
  }

  loginForm = this.fb.group({
  
      loginEmail: ['user@mail.com',[Validators.required, CustomValidators.email] ],
      loginPassword: ['123456', [Validators.required, Validators.minLength(6)]]
      // loginEmail: ['', [Validators.required]],
      // loginPassword: ['', [Validators.required, Validators.minLength(3)]]
    }
  )

  // formInit(): void {
  //   this.loginForm = this.fb.group({
  //     loginEmail: ["user@mail.com",[Validators.required]],
  //     loginPassword: ["", [Validators.required, Validators.minLength(3)]]
  //   });
  // }

}
