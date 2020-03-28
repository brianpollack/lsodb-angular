import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginpageComonent } from './login-page/loginpage.component';
import { HomepageComponent } from './home-page/homepage.component';


const landingroutes: Routes = [
  // { path: "home", component: HomepageComponent },
  { path: "home", component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(landingroutes)],

exports: [RouterModule]
})
export class LandingRoutingModule { }
export const routingComponents = [
  HomepageComponent
];