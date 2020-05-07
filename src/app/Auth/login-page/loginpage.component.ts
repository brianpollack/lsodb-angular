import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from 'ngx-custom-validators'
import { AuthService } from './../../services/firebase/auth.service';
// import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IUser } from '../../models/user';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

 /*  public config1: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  }); */

  pageTitle: string = "";

  loginUser: IUser = {
    email: "",
    password: ""
  };
  // loginForm: FormGroup;

  constructor(
    private activeRouter: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    // private toasterService: ToasterService,
    private observableService: ObservableService
    ) {
     
    this.observableService.navLogin().subscribe(
      data =>{
        console.log(data)
      this.pageTitle = data.title;
      
      }
    )

   }

  ngOnInit() { }

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

    // let isAuthenticated: boolean = false;
    let error: any = null;
   

    this.authService.SignIn(this.loginUser).then(res => {
      try {
        if (res) {
          
          this.loginFun(res);
        } else {
          
          this.loginFun(res)
        }
      }
      catch (err) {
        // console.log(err);
        // error = err;
        this.loginFun(err)
      }

    })

    
  }

  loginFun(isAuthenticated) {
    let error: any = null;
    if(error === null){
      if (isAuthenticated) {
        switch(this.pageTitle){
          case 'masterFileMaintance':
            this.router.navigateByUrl('/masterdashboard');
            break;
            case 'livestockTracking':
              this.router.navigateByUrl('/trackingdashboard');
              break;
            case 'livestockReports':
              this.router.navigateByUrl('/reportdashboard');
              break;
            default:
              return
        }
      } else {
        console.log("auth",isAuthenticated);
        this.observableService.setTosterMsg({
          type: "warning",
          title: "Invalid credentials",
          message: "Try again with correct credentials"
      });
        // this.toasterService.pop("warning", "Invalid credentials", "Try again with correct credentials");
        this.loginForm.reset();
        this.router.navigateByUrl('/login');
      }
    }else {
      this.observableService.setTosterMsg({
        type: "warning",
        title: "Server Error",
        message: "Try again with correct credentials"
    });
      // this.toasterService.pop("warning", "Server Error", "Try again with correct credentials");
      this.loginForm.reset();
    }
  };
}
