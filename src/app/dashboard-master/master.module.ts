import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule, routingComponents } from './master-routing.module';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';
import { LivestockDetailsComponent } from './livestock-details/livestock-details.component';
import { BreedDetailsComponent } from './breed-details/breed-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { MasterComponent } from './master.component';
import { appModuleMaterials  } from '../app.module.materials';
// ui components
import { UnderConstructionComponent } from '../components/under-construction/under-construction.component'

@NgModule({
  declarations: [
    MasterDashboardComponent, 
    LivestockDetailsComponent, 
    BreedDetailsComponent, 
    UserDetailsComponent, 
    CountryDetailsComponent, 
    MasterComponent,
    routingComponents,
    UnderConstructionComponent
    
  ],
  imports: [
  CommonModule,
    MasterRoutingModule,
    appModuleMaterials,
    BrowserAnimationsModule
  ]
})
export class MasterModule { }
