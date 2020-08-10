import { Component, OnInit, ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare let L;

@Component({
  selector: 'app-birth-death-tacking',
  templateUrl: './birth-death-tacking.component.html',
  styleUrls: ['./birth-death-tacking.component.scss']
})
export class BirthDeathTackingComponent implements OnInit {

  @ViewChild("mtg", { static: false }) tagIndex: any;
  tabs = {
    SEARCH: 0,
    FIND: 1,
    TRACK: 2
  };

  search = {}
  find = {}
  track = {}
  map:any;
  constructor() { }

  ngOnInit() {
   
  }

  handleChange(data) {
    console.log(this.tagIndex)

  
    this.tagIndex.selectedIndex = this.tabs[data.tabName];
    if(data.tabName === 'SEARCH') {
      this.search = data;
      console.log(this.search)
    } else if (data.tabName === 'FIND') {
      this.find = data;
      console.log(this.find)
    } else if (data.tabName === 'TRACK') {
      this.track = data;
      console.log(this.track);
    }
  }
  

}
