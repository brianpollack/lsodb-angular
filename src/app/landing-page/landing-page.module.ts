import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './home-page/homepage.component';
import {  appModuleMaterials } from '../app.module.materials'
import { LandingRoutingModule } from './landing-routing.module';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
   //Material Module 
    appModuleMaterials,
  ],
  exports: [
    HomepageComponent
  ]
})
export class LandingPageModule { }
