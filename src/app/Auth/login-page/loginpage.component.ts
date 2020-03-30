import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from 'ngx-custom-validators'
import { AuthService } from './../../services/firebase/auth.service';

import { IUser } from '../../models/user';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  pageTitle: string = '';

  loginUser: IUser = {
    email: '',
    password: ''
  };
  // loginForm: FormGroup;

  constructor(
    private activeRouter: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // this.pageTitle =  this.activeRouter.params.value.pageName;
    this.activeRouter.paramMap.subscribe((params: ParamMap) => {
      this.pageTitle = params.get('pageName');

    })
    // console.log();
    // this.formInit();
  }

  // form group infomation 
  loginForm = this.fb.group({

    loginEmail: ['user@mail.com', [Validators.required, CustomValidators.email]],
    loginPassword: ['123456', [Validators.required, Validators.minLength(6)]]
  }
  )

  // form on submit
  onSubmit() {
    this.loginUser.email = this.loginForm.value.loginEmail;
    this.loginUser.password = this.loginForm.value.loginPassword;

    // console.log(this.authService.SignIn( this.loginUser))

    this.authService.SignIn(this.loginUser).then(res => {
      try {
        if (res) {
          // console.log(res);
          this.router.navigateByUrl('/test');
        } else {
          // console.log(res);
          this.router.navigateByUrl('/login');
        }
      }
      catch (err) {
        console.log(err);
      }

    }

    )
    console.log(this.loginForm.value);
  }
}
