import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/firebase/auth.guard';
import { TrackingComponent } from './tracking.component';

const routes: Routes = [
  {
    path: "trackingdashboard", component: TrackingComponent, canActivate: [AuthGuard],

    //   children: [
    //     { path: "", redirectTo: "masterdashboard",pathMatch: "full" },

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
export const routingComponents = [
  TrackingComponent
];
