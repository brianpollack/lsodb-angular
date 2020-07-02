import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ObservableService } from 'src/app/services/observable.service';
import * as _ from 'lodash';

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
  livestocksLists:any;
  selected;

  constructor(private observableService: ObservableService) {
    
  }


  refresh(params: any): boolean {
    return true;
  }


  agInit(params: ICellRendererParams): void {
    // this.observableService.getls().subscribe(
    //   res =>{
    //     this.livestocksLists  = res;
    //     console.log("list obs", this.livestocksLists);
    //   }
    //   );
    this.livestocksLists = this.observableService.getls();
      this.params = params;
      this.selected =  _.find(this.livestocksLists, (e) => e.livestockName === this.params.value);
      if(this.selected && this.selected.id) {
        // console.log(this.selected.id);
        
        this.lsSelected(this.selected.id);
      }
  }

  
  onChange(e){
    let livestockId = e.value.id
    // console.log("ls change event",livestockId);
    // this.lsSelected(livestockId);
    this.params.data.lsName = e.value.livestockName
    // this.params.onselecls(this.params.node)
  }

  lsSelected(livestockId){
    console.log("in ls drop cmp" ,livestockId)
    this.params.onDrop(livestockId)
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
