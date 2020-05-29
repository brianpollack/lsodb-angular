import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IAuthUser } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userData: Observable<firebase.User>
  authUser: IUser
  userData: IAuthUser; // Save logged in user data

  constructor(private authFire: AngularFireAuth) {
    // this.userData = authFire.authState;

     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    
    this.authFire.authState.subscribe(user => {
      // if (user) {
      //   console.log("userData",user )
      //   this.userData = user;
      //   localStorage.setItem('user', JSON.stringify(this.userData));
      //   JSON.parse(localStorage.getItem('user'));
        
      // } else {
      //   localStorage.setItem('user', null);
      //   JSON.parse(localStorage.getItem('user'));
      // }
    })
    
  }

  // signin
 async SignIn(userCredinals: IUser): Promise<boolean> {
    let retVal : boolean = false;
   await this.authFire.auth
    .signInWithEmailAndPassword(userCredinals.email, userCredinals.password)
    .then(res =>{
      retVal = true;
      this.SetUserData(res.user);
      localStorage.setItem('user', JSON.stringify(this.userData));
    })
    .catch(err =>{
      retVal = false;
    });

   return retVal;
  }

   // Returns true when user is looged in and email is verified
    async isLoggedIn(): Promise<boolean> {
     const user = await JSON.parse( await localStorage.getItem('user'));
    return (user !== null && user.email !== "") ? true : false;
  }

  // setting the userdata
  SetUserData(user) {
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  }

  // Sign out 
  SignOut() {
   
    return this.authFire.auth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }
}
