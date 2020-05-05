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
import { TrackingModule } from "./dashboard-tracking/tracking.module";
import { ReportsModule } from "./dashboard-reports/reports.module";
import { TosterComponent } from './components/toster/toster.component';
import { ToasterModule } from 'angular2-toaster';
// import { GridButtonComponent } from './ag-grid-components/grid-button/grid-button.component';
// import { ActionBtnComponent } from './ag-grid-components/action-btn/action-btn.component';
// import { UnderConstructionComponent } from './components/under-construction/under-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TosterComponent,
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
    MasterModule,
    TrackingModule,
    ReportsModule,
    ToasterModule.forRoot(),
  ],
  providers: [],
  exports: [
    // UnderConstructionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
