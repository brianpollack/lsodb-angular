import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './login-page/loginpage.component';


const routes: Routes = [
  // { path: "home", component: HomepageComponent },
  { path: "login/:pageName", component: LoginpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class LoginRoutingModule { }
export const routingComponents = [
  LoginpageComponent
];