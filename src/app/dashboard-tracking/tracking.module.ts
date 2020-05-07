import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { ClickOutsideModule  } from 'ng-click-outside';

// graphql module
import { GraphqlModule } from '../graphql.module'

// material
import { appModuleMaterials  } from '../app.module.materials';

// routing module
import { TrackingRoutingModule, routingComponents } from './tracking-routing.module';

// ui components
// import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';
import { ActionBtnComponent } from '../ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from '../ag-grid-components/grid-button/grid-button.component'

// toster modules
import {ToasterModule, ToasterService} from 'angular2-toaster';

// tracking dashboard components
import { TrackingComponent } from './tracking.component';

import { MasterModule } from '../dashboard-master/master.module'

@NgModule({
  declarations: [
    routingComponents,
    TrackingComponent
  ],
  imports: [
    // UnderConstructionComponent,
    CommonModule,
    TrackingRoutingModule,
    appModuleMaterials,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    AgGridModule.withComponents([ActionBtnComponent, GridButtonComponent]),
    GraphqlModule,
    ToasterModule.forRoot(),
    MasterModule
    
  ]
})
export class TrackingModule { }
