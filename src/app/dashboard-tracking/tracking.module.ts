import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { ClickOutsideModule  } from 'ng-click-outside';
// import { AllModules } from 'ag-grid-enterprise';
// graphql module
import { GraphqlModule } from '../graphql.module'

// material
import { appModuleMaterials  } from '../app.module.materials';

// routing module
import { TrackingRoutingModule, routingComponents } from './tracking-routing.module';

// ui components
// import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';
import { ActionBtnComponent } from '../ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from '../ag-grid-components/grid-button/grid-button.component';
import { GridSelectComponentComponent } from '../ag-grid-components/drop-box/grid-select-component.component';
import { LivestockSelectComponent } from '../ag-grid-components/drop-box/livestock-select/livestock-select.component'
import { BreedSelectComponent } from '../ag-grid-components/drop-box/breed-select/breed-select.component'
import { DiplayImgComponent } from '../ag-grid-components/diplay-img/diplay-img.component'
// toster modules
import {ToasterModule, ToasterService} from 'angular2-toaster';

// tracking dashboard components
import { TrackingComponent } from './tracking.component';

import { MasterModule } from '../dashboard-master/master.module';
import { OwnershipDetailsComponent } from './ownership-details/ownership-details.component';
import { BirthDeathTackingComponent } from './birth-death-tacking/birth-death-tacking.component';
import { SalesTackingComponent } from './sales-tacking/sales-tacking.component';
import { TackingDashboardComponent } from './tacking-dashboard/tacking-dashboard.component';
import { ViewTabComponent } from './ownership-details/view-tab/view-tab.component';
import { AddTabComponent } from './ownership-details/add-tab/add-tab.component';
import { LsdataTabComponent } from './ownership-details/lsdata-tab/lsdata-tab.component';
import { PincodeTabComponent } from './ownership-details/pincode-tab/pincode-tab.component';
// import { MapTapComponent } from './ownership-details/map-tap/map-tap.component';
import { MapTabComponent } from './ownership-details/map-tab/map-tab.component';
import { SearchPlaceComponent } from './birth-death-tacking/searchplace/search-place.component';
import { FindOwnerComponent } from './birth-death-tacking/find-owner/find-owner.component';
import { TrackingLsBirthDeathComponent } from './birth-death-tacking/tracking-ls-birth-death/tracking-ls-birth-death.component'
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    routingComponents,
    TrackingComponent,
    OwnershipDetailsComponent,
    BirthDeathTackingComponent,
    SalesTackingComponent,
    TackingDashboardComponent,
    ViewTabComponent,
    AddTabComponent,
    LsdataTabComponent,
    PincodeTabComponent,
    // MapTapComponent,
    MapTabComponent,
    SearchPlaceComponent,
    FindOwnerComponent,
    TrackingLsBirthDeathComponent
  ],
  imports: [
  
  
// UnderConstructionComponent,
    CommonModule,
    TrackingRoutingModule,
    appModuleMaterials,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    AgGridModule.withComponents([ActionBtnComponent, GridButtonComponent, GridSelectComponentComponent, LivestockSelectComponent, BreedSelectComponent, DiplayImgComponent]),
    GraphqlModule,
    ToasterModule.forRoot(),
    MasterModule,
    NgCircleProgressModule.forRoot(),
    
  ]
})
export class TrackingModule { }
