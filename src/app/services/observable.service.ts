import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  public list = [];
  public breedList = [];
  constructor() { }

  private selectedTab = new Subject<any>();
  private changeTab = new Subject<any>();
  private loginnavigate = new BehaviorSubject<any>('');
  private tosterMessage = new Subject<any>();
  private mapOnLoad = new Subject<any>();
  private loadList = new Subject<any>();
  private livestockList = new Subject<any>();

  /* ************ selectedTab *****************  */
  // ======= subcribe function ==========
  navigateTab(): Observable<any> {
    return this.selectedTab.asObservable();
  }

  // ========= set tab detais ==========
  setTab(selectedData: any) {
    return this.selectedTab.next(selectedData);
  }

  /* ************ changeTab *****************  */
  // ======= subcribe function ==========
  navChange(): Observable<any> {
    return this.changeTab.asObservable();
  }

  // ========= set tab detais (for move back or front) ==========
  setNav(changeData: any) {
    return this.changeTab.next(changeData);
  }

  /* ***************** login Navigation *************** */
  navLogin(): Observable<any> {
    return this.loginnavigate.asObservable();
  }

  setLogin(logingData: any) {
    return this.loginnavigate.next(logingData);
  }


  /* ******************* toster message **************** */
  tosterMsg(): Observable<any> {
    return this.tosterMessage.asObservable();
  }

  setTosterMsg(tosterMsg: any) {
    return this.tosterMessage.next(tosterMsg);
  }


  /* *********************** load Map ************ */

  loadMap(): Observable<any> {
    return this.mapOnLoad.asObservable();
  }

  setMap() {
    return this.mapOnLoad.next();
  }

  /* livestock and breed list */

  getList(){
    console.log("service breed", this.breedList)
    return this.breedList;
    // return this.loadList.asObservable();
  }

  setList(list){
    console.log("service breedlist", list);
    this.breedList = list
    // return this.loadList.next(list);
  }


  getls(){
    return this.list;
    // return this.livestockList.asObservable();
  }

  setls(list){
    
    this.list = list;
    // return this.livestockList.next(list);
  }
  
  


}
