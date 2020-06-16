import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableService } from 'src/app/services/observable.service';
import { OwnerDetailsService } from 'src/app/services/graphql/owner-details.service';


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

  formData = {};
  pincodeData = {};
  mapData = {};
  viewData = {};
  
  constructor(
    private observableService: ObservableService,
    private dataService: OwnerDetailsService,
  ) {
   }

  ngOnInit() {
    /* this.observableService.navigateTab().subscribe(
      data => {
        console.log("navigateTab with data",this.tabs[data.tabName])
        this.tagIndex.selectedIndex = this.tabs[data.tabName];
       
      }
    ) */

    /* this.observableService.navChange().subscribe(
      data => {
        console.log("naviage only tab",this.tabs[data]);
        // this.tagIndex.selectedIndex = this.tabs[data];
      }
    ) */
   
  }

  changeTab(data){
    console.log(data,data.tabName );
    this.tagIndex.selectedIndex = this.tabs[data.tabName];
    if (data.tabName === 'ADD') {
      this.formData = data;
      console.log(this.formData)
    } else if ( data.tabName === 'PINCODE') {
      this.pincodeData = data;
      console.log(this.pincodeData)
    } else if ( data.tabName === 'MAP') {
      this.mapData = data;
      console.log(this.mapData);
    } else if (data.tabName === 'VIEW') {
      // this.dataService.findAllOwner().subscribe(
      //   res => {
          this.viewData = data
        // }
      // )
    }
  }

  


}
