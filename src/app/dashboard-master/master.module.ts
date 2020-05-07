import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule } from '@angular/forms'
// graphql module
import { GraphqlModule } from '../graphql.module'

// page components
import { MasterRoutingModule, routingComponents } from './master-routing.module';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';
import { LivestockDetailsComponent } from './livestock-details/livestock-details.component';
import { BreedDetailsComponent } from './breed-details/breed-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { MasterComponent } from './master.component';
import { CountryComponent } from './country-details/country/country.component';
import { StateComponent } from './country-details/state/state.component';
import { DistrictComponent } from './country-details/district/district.component';
import { TalukComponent } from './country-details/taluk/taluk.component';
import { TownComponent } from './country-details/town/town.component';
import { VillageComponent } from './country-details/village/village.component';

// materrial
import { appModuleMaterials } from '../app.module.materials';

// ui components
import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';
import { ActionBtnComponent } from '../ag-grid-components/action-btn/action-btn.component';
import { GridButtonComponent } from '../ag-grid-components/grid-button/grid-button.component'
// toster modules
import { ToasterModule } from 'angular2-toaster';
// app module 


@NgModule({
  declarations: [
    MasterDashboardComponent,
    LivestockDetailsComponent,
    BreedDetailsComponent,
    UserDetailsComponent,
    CountryDetailsComponent,
    MasterComponent,
    UnderConstructionComponent,
    routingComponents,
    ActionBtnComponent,
    GridButtonComponent,
    CountryComponent,
    StateComponent,
    DistrictComponent,
    TalukComponent,
    TownComponent,
    VillageComponent


  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    appModuleMaterials,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    AgGridModule.withComponents([ActionBtnComponent, GridButtonComponent]),
    GraphqlModule,
    ToasterModule.forRoot(),

  ],
  exports: [
    UnderConstructionComponent
  ]
})
export class MasterModule { }

