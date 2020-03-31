import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// firebase Authentication
import { AuthGuard } from '../services/firebase/auth.guard';

// child components
import { MasterComponent } from './master.component';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';
import { BreedDetailsComponent } from "./breed-details/breed-details.component"
import { CountryDetailsComponent } from "./country-details/country-details.component"
import { LivestockDetailsComponent } from "./livestock-details/livestock-details.component"
import { UserDetailsComponent } from "./user-details/user-details.component";

const routes: Routes = [

  { path: "masterdashboard", component: MasterComponent, canActivate: [AuthGuard],

      children: [
          { path: "", redirectTo: "masterdashboard",pathMatch: "full" },
          { path: "masterdashboard", component: MasterDashboardComponent },
          { path: "livestock", component: LivestockDetailsComponent },
          { path: "breeds", component: BreedDetailsComponent },
          { path: "country", component: CountryDetailsComponent },
          { path: "users", component: UserDetailsComponent },

      ]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class MasterRoutingModule { }

export const routingComponents = [
  MasterComponent,
  MasterDashboardComponent,
  LivestockDetailsComponent,
  BreedDetailsComponent,
  CountryDetailsComponent,
  UserDetailsComponent
];
