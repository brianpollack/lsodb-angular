import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/firebase/auth.guard';
import { ReportsComponent } from './reports.component';



const routes: Routes = [
  {

  
  path: "reportdashboard", component: ReportsComponent, canActivate: [AuthGuard],

  //   children: [
  //     { path: "", redirectTo: "masterdashboard",pathMatch: "full" },

  // ]
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