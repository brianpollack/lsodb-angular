import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/firebase/auth.guard';
import { TrackingComponent } from './tracking.component';
import { OwnershipDetailsComponent } from './ownership-details/ownership-details.component';
import { BirthDeathTackingComponent } from './birth-death-tacking/birth-death-tacking.component';
import { SalesTackingComponent } from './sales-tacking/sales-tacking.component';
import { TackingDashboardComponent } from './tacking-dashboard/tacking-dashboard.component';

const routes: Routes = [
  {
    path: "trackingdashboard", component: TrackingComponent, canActivate: [AuthGuard],

     children: [
        { path: "", redirectTo: "trackingdashboard",pathMatch: "full" },
        { path: "trackingdashboard", component: TackingDashboardComponent },
        { path: "ownerShip", component: OwnershipDetailsComponent },
        { path: "birthDeath", component: BirthDeathTackingComponent },
        { path: "sales", component: SalesTackingComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
export const routingComponents = [
  TrackingComponent,
  OwnershipDetailsComponent,
  BirthDeathTackingComponent,
  SalesTackingComponent
];
