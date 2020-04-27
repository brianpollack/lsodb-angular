import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() { }

private selectedTab = new Subject<any>();
private changeTab = new Subject<any>();

// ======= subcribe function ==========
navigateTab(): Observable<any>{
  return this.selectedTab.asObservable();
}

// ========= set tab detais ==========
setTab(selectedData: any ) {
  return this.selectedTab.next(selectedData);
}


// ======= subcribe function ==========
navChange(): Observable<any>{
  return this.changeTab.asObservable();
}

// ========= set tab detais ==========
setNav(changeData: any ) {
  return this.changeTab.next(changeData);
}



}
