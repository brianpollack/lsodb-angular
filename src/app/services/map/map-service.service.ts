import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient ) {

   }


   getlocation(url: string) {
     return this.http.get(url)
   }

   getClickLocation(url: string){
     return this.http.get(url)
   }

}
