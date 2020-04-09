import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindAllLivestockResponse, FindLivestockResponse, FIND_ALL_LIVESTOCK } from 'src/app/dashboard-master/grphql/queries/query/livestockQuery';
import { Livestock } from './../../dashboard-master/grphql/interface/livestockInterface';


@Injectable({
  providedIn: 'root'
})
export class MasterfileService {

  livestocks: Livestock[]
  constructor(
    private apollo: Apollo
  ) { }

  findAll(): Observable<FindAllLivestockResponse> {

    return this.apollo
    .query<FindAllLivestockResponse>({ query: FIND_ALL_LIVESTOCK })
    .pipe(map(result => result.data));
  }
}
