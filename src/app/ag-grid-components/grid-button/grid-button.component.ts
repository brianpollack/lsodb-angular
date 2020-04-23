import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-button',
  templateUrl: './grid-button.component.html',
  styleUrls: ['./grid-button.component.scss']
})
export class GridButtonComponent implements  ICellRendererAngularComp {
  params: any;
  constructor() { }
  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onClick(){
    this.params.onSelect(this.params.node.data);
  }


  // afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  //   throw new Error("Method not implemented.");
  // }

  ngOnInit() {
  }

}
