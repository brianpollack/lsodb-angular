import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent implements ICellRendererAngularComp  {

  params: any;
  constructor() { }
  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  edit() {
    this.params.onEdit(this.params.node.data)
  }

  delete() {
    this.params.onDelete(this.params.node.data);
  }
  // afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  //   throw new Error("Method not implemented.");
  // }

}
