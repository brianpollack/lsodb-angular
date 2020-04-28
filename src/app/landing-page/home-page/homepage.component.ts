import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/auth.service'
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private observableService: ObservableService
    ) { 
        this.authService.SignOut();

     }

  ngOnInit() {

  }

  handleLogin(pageName: string) {
    // this.router.navigate(['/login', pageName]);
    const loginData  = {
      title: pageName
    }
    this.observableService.setLogin(loginData) 
    this.router.navigateByUrl('/login');

    
  }
}
