import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrls: ['./toster.component.scss']
})
export class TosterComponent implements OnInit {


  public config2: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
    animation: "fade"
  });
  constructor(
    private toasterService: ToasterService,
    private observableService: ObservableService
  ) {
  this.observableService.tosterMsg().subscribe(
    res => {
      this.toasterService.pop(res.type, res.title, res.message)
    }
  )

   }

  ngOnInit() {
  }


  // this.toasterService.pop()
}
