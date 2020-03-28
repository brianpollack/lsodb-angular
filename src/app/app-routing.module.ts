import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomepageComponent } from './landing-page/home-page/homepage.component';
// import { LoginpageComponent } from './loginpage/login-page/loginpage.component';


const routes: Routes = [
  { path: "", redirectTo: '/home', pathMatch: 'full' },
  { path: "", redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  // HomepageComponent,
  // LoginpageComponent
];