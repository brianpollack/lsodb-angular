import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//  import {LicenseManager} from 'ag-grid-enterprise';
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("BOARD4ALL_NDEwMjM1MTIwMDAwMA==8f4481b5cc626ad79fe91bc5f4e52e3d");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  
// LicenseManager.setLicenseKey('BOARD4ALL_NDEwMjM1MTIwMDAwMA==8f4481b5cc626ad79fe91bc5f4e52e3d'); 
