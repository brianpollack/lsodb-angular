import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/auth.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { 
        // this.authService.SignOut();

     }

  ngOnInit() {

  }

  handleLogin(pageName: string) {
    this.router.navigate(['/login', pageName]);
  }
}
