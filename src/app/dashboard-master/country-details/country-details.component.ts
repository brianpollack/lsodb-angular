import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  @ViewChild('mtg', { static: false }) tagIndex: any;
  tabs = {
    "COUNTRY": 0,
    "STATE": 1,
    "DISTRICT": 2,
    "TALUK": 3,
    "TOWN": 4,
    "VILLAGE": 5
  }
  constructor(
    private observableService: ObservableService
  ) {
    this.observableService.navigateTab().subscribe(
      data => {
        this.tagIndex.selectedIndex = this.tabs[data.tabName];
      }
    )

    this.observableService.navChange().subscribe(
      data => {
        this.tagIndex.selectedIndex = this.tabs[data];
      }
    )
  }

  ngOnInit() {
  }






}
