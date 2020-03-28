
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { SelectModule } from "ng-select";
// import { NgxSelectModule } from "ngx-select-ex";
// import { ToasterModule } from "angular2-toaster";

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatToolbarModule,
  MatRadioModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule
} from "@angular/material";
import { summaryFileName } from "@angular/compiler/src/aot/util";
import { from } from "rxjs";

export const appModuleMaterials = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatRadioModule,
  MatTabsModule,
  MatTableModule,  
  MatCardModule
  // NgxSelectModule,
  // ToasterModule

];
