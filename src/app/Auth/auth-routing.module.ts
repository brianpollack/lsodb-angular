import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './login-page/loginpage.component';
// import { TestComponent } from './test-dashboard/test.component';
import { AuthGuard } from '../services/firebase/auth.guard';


const routes: Routes = [
  // { path: "home", component: HomepageComponent },
  { path: "login", component: LoginpageComponent},
  // { path: "test", component: TestComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class LoginRoutingModule { }
export const routingComponents = [
  LoginpageComponent,
  // TestComponent
];