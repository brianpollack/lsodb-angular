import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { LoginRoutingModule, routingComponents } from './auth-routing.module';
import { LoginpageComponent } from './login-page/loginpage.component';
// pipe
import { SplitWord } from '../pipes/splitWord';
// material module
import { appModuleMaterials } from '../app.module.materials';

// firebase Modules
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TestComponent } from './test-dashboard/test.component';
// import { AuthService } from '../services/firebase/auth.service';

// toster modules
import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
  declarations: [
    LoginpageComponent,
    routingComponents,
    SplitWord,
    TestComponent
  ],
  imports: [

    CommonModule,
    appModuleMaterials,
    LoginRoutingModule,
    ReactiveFormsModule,
    // firebase Modulues
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToasterModule.forRoot(),
    
  ],
  providers: [
    // AuthService
    ToasterService
  ],
  exports: [
    LoginpageComponent
  ]
})
export class LoginpageModule { }
