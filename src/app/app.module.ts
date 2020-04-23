import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material Module
import { appModuleMaterials } from "./app.module.materials";
// custom Module
import { LandingPageModule } from "./landing-page/landing-page.module";
import { LoginpageModule } from './Auth/auth.module';
import { MasterModule } from "./dashboard-master/master.module";
// import { GridButtonComponent } from './ag-grid-components/grid-button/grid-button.component';
// import { ActionBtnComponent } from './ag-grid-components/action-btn/action-btn.component';
// import { UnderConstructionComponent } from './components/under-construction/under-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    // GridButtonComponent,
    // ActionBtnComponent,
    // UnderConstructionComponent
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
    LoginpageModule,
    MasterModule
  ],
  providers: [],
  exports: [
    // UnderConstructionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
