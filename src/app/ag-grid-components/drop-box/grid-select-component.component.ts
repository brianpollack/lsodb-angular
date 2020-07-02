import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import { ObservableService } from "src/app/services/observable.service";

@Component({
  selector: "app-grid-select-component",
  templateUrl: "./grid-select-component.component.html",
  styleUrls: ["./grid-select-component.component.scss"],
})
export class GridSelectComponentComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private observableService: ObservableService) {
    // this.observableService.getList().subscribe(
    //   res =>{
    //     this.livestocksLists  = res;
    //     console.log("list obs", this.livestocksLists);
    //   }
    // );
  }
  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onChange(e) {}

  onload() {}

  ngOnInit() {
    // setTimeout(() => {
    //  console.log("grid component init")
    //   console.log(this.params);
    // this.foods = this.params.food;
    // }, 2000);
  }
}
