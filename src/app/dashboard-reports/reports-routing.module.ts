import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/firebase/auth.guard';
import { ReportsComponent } from './reports.component';
import { ReportOwnerComponent } from './report-owner/report-owner.component';
import { ReportLivestockComponent } from './report-livestock/report-livestock.component';



const routes: Routes = [
  {

  
  path: "reportdashboard", component: ReportsComponent, canActivate: [AuthGuard],

    children: [
      { path: "", redirectTo: "livestock",pathMatch: "full" },
      { path: "livestock", component: ReportLivestockComponent },
      { path: "owner", component: ReportOwnerComponent },
      // { path: "geographic", component: TackingDashboardComponent },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ReportsRoutingModule { }
export const routingComponents = [
  ReportsComponent
];