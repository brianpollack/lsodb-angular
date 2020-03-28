import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material Module
import { appModuleMaterials } from "./app.module.materials";
// custom Module
import { LandingPageModule } from "./landing-page/landing-page.module";
import { LoginpageModule } from './loginpage/loginpage.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
  
  // angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Material Module 
    appModuleMaterials,
    // custom Modules
    LandingPageModule,
    LoginpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
