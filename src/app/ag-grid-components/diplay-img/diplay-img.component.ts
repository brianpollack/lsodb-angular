import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-diplay-img',
  template: `
    <img border="0" width="60" height="60" style="border-radius: 50%; padding: 5px;"  [src]="params.value ? params.value : '/assets/img/nouser01.svg'">
  `,
  styles: []
})
export class DiplayImgComponent implements ICellRendererAngularComp {

  params: any;
  constructor() { }
  refresh(params: any): boolean {
   return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
 

  ngOnInit() {
  }

}
