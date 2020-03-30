import { Component } from '@angular/core';
import { AuthService } from './services/firebase/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lsodb-client';

  constructor(  private authService: AuthService ) {

    this.authService.SignOut();
    // localStorage.removeItem('user');
  }
}
