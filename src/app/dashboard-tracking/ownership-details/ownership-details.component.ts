import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableService } from "src/app/services/observable.service";
import { OwnerDetailsService } from "src/app/services/graphql/owner-details.service";

@Component({
  selector: "app-ownership-details",
  templateUrl: "./ownership-details.component.html",
  styleUrls: ["./ownership-details.component.scss"],
})
export class OwnershipDetailsComponent implements OnInit {
  @ViewChild("mtg", { static: false }) tagIndex: any;
  tabs = {
    VIEW: 0,
    ADD: 1,
    LSDATA: 2,
    PINCODE: 3,
    MAP: 4,
  };

  Dview;
  Dadd;
  btnDisable = true;
  formData = {};
  pincodeData = {};
  mapData = {};
  viewData = {};
  lsData = {};
  localLSData = {};

  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService
  ) {}

  ngOnInit() {}

  trackData(data) {
    this.Dview = data.viewValue;
    this.Dadd = data.addValue;
    if (data.tabName === "LSDATA") {
      this.localLSData = data;
    }

    console.log("trackData", data);
  }

  changeTab(data) {
    this.tagIndex.selectedIndex = this.tabs[data.tabName];
    if (data.tabName === "ADD") {
      this.formData = data;
    } else if (data.tabName === "PINCODE") {
      this.pincodeData = data;
    } else if (data.tabName === "MAP") {
      this.mapData = data;
    } else if (data.tabName === "VIEW") {
      this.Dview = data.viewValue;
      this.Dadd = data.addValue;
      this.viewData = data;
    } 
    // else if (data.tabName === "LSDATA") {
    //   this.Dview = data.viewValue;
    //   this.Dadd = data.addValue;
    //   this.localLSData = data;
    //   console.log("trackData", data);
    // }
  }

  test(mtg) {
    mtg.selectedIndex = 2;
    this.lsData = this.localLSData;
  }
}
