import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ObservableService } from 'src/app/services/observable.service';
import * as _ from 'lodash';
import { MasterfileService } from 'src/app/services/graphql/masterfile.service';

@Component({
  selector: "app-breed-select",
  template: `
    <mat-form-field>
      <!-- <mat-label>Favorite food</mat-label> -->
      <mat-select (selectionChange)="onChange($event)" [(value)]="selected">
        <mat-option
          *ngFor="let breedsList of params?.data?.breedList"
          [value]="breedsList"
        >
          {{ breedsList?.breedName }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
})
export class BreedSelectComponent implements ICellRendererAngularComp {
 
  params: any;
  breedsLists: any;
  selected;

  constructor(private observableService: ObservableService,
    private dataService: MasterfileService) {

    // console.log("breed constructor")
    // this.breedsLists = this.observableService.getList()
    // console.log("breed list in bcomp",this.breedsLists);
  }

  refresh(params: any): boolean {
    console.log('onchange breed component', params);
    return true;
  }
  
  agInit(params: ICellRendererParams): void {

    console.log('on Init breed component', params);
  this.params = params;
  /* ******* on load data from back end ************** */
  
  // get whole livestock list
  const livestocksLists = this.observableService.getls();
  // find livestock obj of current row value
  const livestockObj = _.find(livestocksLists, (e) => e.livestockName === this.params.data.lsName)
  // getting breed list of livestock object
  this.params.data.breedList = livestockObj && livestockObj.breeds ? livestockObj.breeds : [];
  
  // to show current row value of breed object
  this.selected = _.find(this.params.data.breedList, (e) => e.breedName === this.params.value);

  // this.observableService.getList().subscribe(
  //   res => {
  //     this.params.data.breedList = res;
  //   }
  // )
   
  }

  onChange(e){
   
    this.params.data.breedName = e.value.breedName
  }

  ngOnInit() {
    
  }
}
