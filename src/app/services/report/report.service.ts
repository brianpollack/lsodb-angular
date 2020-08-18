import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getDistrict(){
    return this.http.get('../../assets/jsonfile/district.json');
  }

  getOwner(){
    return this.http.get('../../assets/jsonfile/ownerLs.json');
  }
  
}
