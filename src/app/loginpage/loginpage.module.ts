import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { LoginRoutingModule, routingComponents } from './login-routing.module';
import { LoginpageComponent } from './login-page/loginpage.component';
// pipe
import { SplitWord } from '../pipes/splitWord';
// material module
import { appModuleMaterials } from '../app.module.materials';


@NgModule({
  declarations: [
    LoginpageComponent,
    routingComponents,
    SplitWord
  ],
  imports: [

    CommonModule,
    appModuleMaterials,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginpageComponent
  ]
})
export class LoginpageModule { }
