import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ObservableService } from "src/app/services/observable.service";
import * as _ from "lodash";

@Component({
  selector: "app-livestock-select",
  template: `
    <mat-form-field>
      <mat-select (selectionChange)="onChange($event)" [(value)]="selected">
        <mat-option
          *ngFor="let livestocksList of livestocksLists"
          [value]="livestocksList"
        >
          {{ livestocksList?.livestockName }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
})
export class LivestockSelectComponent implements ICellRendererAngularComp {
  params: any;
  livestocksLists: any;
  selected;

  constructor(private observableService: ObservableService) {}

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;

    /* ******* on load data from back end ************** */

    // get whole livestock list
    this.livestocksLists = this.observableService.getls();

    // to show current row value of breed object

    this.selected = _.find(
      this.livestocksLists,
      (e) => e.livestockName === this.params.value
    );

    if (this.selected && this.selected.id) {
      this.lsSelected(this.selected.breeds);
    }

  }

  onChange(e) {

    let breedList= e.value.breeds;
    this.lsSelected(breedList);
    this.params.data.lsName = e.value.livestockName;
    this.params.data.breedList = e.value.breeds;
    // this.params.node.setData(this.params.data);
    
  }

  lsSelected(breedList) {
    // this.params.onDrop(breedList); .next
    //  this.observableService.setList(breedList)
  }

  ngOnInit() {
    // this.observableService.getls().subscribe(
    //   res =>{
    //     this.livestocksLists  = res;
    //     console.log("list obs", this.livestocksLists);
    //   }
    // );
  }
}
