import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableService } from 'src/app/services/observable.service';


@Component({
  selector: "app-ownership-details",
  templateUrl: "./ownership-details.component.html",
  styleUrls: ["./ownership-details.component.scss"],
})
export class OwnershipDetailsComponent implements OnInit {


  @ViewChild('mtg', { static: false }) tagIndex: any;
  tabs = {
    "VIEW": 0,
    "ADD": 1,
    "LSDATA": 2,
    "PINCODE": 3,
    "MAP": 4,
  }

  constructor(
    private observableService: ObservableService
  ) { }

  ngOnInit() {
    this.observableService.navigateTab().subscribe(
      data => {
        console.log("navigateTab with data",this.tabs[data.tabName])
        this.tagIndex.selectedIndex = this.tabs[data.tabName];
      }
    )

    this.observableService.navChange().subscribe(
      data => {
        console.log("naviage only tab",this.tabs[data]);
        this.tagIndex.selectedIndex = this.tabs[data];
      }
    )
  }


}
