import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ObservableService } from 'src/app/services/observable.service';
import * as _ from 'lodash';

@Component({
  selector: "app-breed-select",
  template: `
    <mat-form-field>
      <!-- <mat-label>Favorite food</mat-label> -->
      <mat-select (selectionChange)="onChange($event)" [(value)]="selected">
        <mat-option
          *ngFor="let breedsList of breedsLists"
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

  constructor(private observableService: ObservableService) {

    // console.log("breed constructor")
    // this.breedsLists = this.observableService.getList()
    // console.log("breed list in bcomp",this.breedsLists);
  }

  refresh(params: any): boolean {
    return true;
  }
  
  agInit(params: ICellRendererParams): void {
    this.breedsLists = this.observableService.getList()
    console.log("breed list in bcomp",this.breedsLists);
    // console.log("breed agInt")
    this.params = params;
   
    // console.log("breed params",this.params);
    this.selected = _.find(this.breedsLists, (e) => e.breedName === this.params.value);
    console.log(this.selected);
  }

  onChange(e){
    // console.log(e.value);
    // console.log(this.params);
    this.params.data.breedName = e.value.breedName
  }

  ngOnInit() {
    // console.log("breed ngInt")
    // console.log("breed params", this.params)
    // this.observableService.getList().subscribe(
    //   res =>{
    //     this.breedsLists  = res;
    //     // console.log("list obs", this.breedsLists);
    //   }
    // );
  }
}
