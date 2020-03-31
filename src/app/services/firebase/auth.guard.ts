import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isLoggedIn().then( res =>
      {
        console.log(res)
        if (res !== true) {
          
          console.log('auth gurd');
          this.router.navigateByUrl('/home');
        } 

      }) 
     
        
        // else {
        //   return tr

    // if (this.authService.isLoggedIn() !== true) {

    //   console.log('auth gurd');
    //   this.router.navigateByUrl('/home');
    // }


      return true;
  }

}
