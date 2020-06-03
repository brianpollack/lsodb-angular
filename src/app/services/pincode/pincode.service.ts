import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http: HttpClient) { }


  getpincode(pin: string){
    let url = `https://api.postalpincode.in/pincode/${pin}`
    return this.http.get(url);
  }

  getPlace(place: string){
    console.log("place", place)
    let url = `https://api.postalpincode.in/postoffice/${place}`
    return this.http.get(url);
  }

}
