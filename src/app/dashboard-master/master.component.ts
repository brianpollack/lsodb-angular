import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ width: 0 }),
            animate('0.5s ease-out', 
                    style({ width: 250 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ width: 250 }),
            animate('0.5s ease-in', 
                    style({ width: 0 }))
          ]
        )
      ]
    )
  ]
})
export class MasterComponent implements OnInit {

  showMenu: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // onToggle() {
  //   console.log(this.showMenu);
  //   this.showMenu = !this.showMenu;
  // }
  toggleMenu(btn) {
    console.log(btn.checked);
    btn.checked = !btn.checked;
  }

  logOut(){
   
    this.authService.SignOut().then(
      res => {
        this.router.navigateByUrl('/home');
      }
    )

  }

}
