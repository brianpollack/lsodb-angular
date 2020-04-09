import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindAllLivestockResponse, FindLivestockResponse, FIND_ALL_LIVESTOCK, FIND_LIVESTOCK } from 'src/app/dashboard-master/grphql/queries/query/livestockQuery';
import { Livestock, ParamsCreateLivestock, ParamsEditLiveStock, ParamsDeleteLivestock } from './../../dashboard-master/grphql/interface/livestockInterface';
import { CreateLivestockResponse, CREATE_LIVESTOCK, EDIT_LIVESTOCK, EditLivestockResponse, DeleteLivestockResponse, DELETE_LIVESTOCK } from 'src/app/dashboard-master/grphql/queries/mutation/livestockMutation';




@Injectable({
  providedIn: 'root'
})
export class MasterfileService {

  livestocks: Livestock[]
  constructor(
    private apollo: Apollo
  ) { }

  // ======== find all livestock =======
  findAll(): Observable<FindAllLivestockResponse> {
    return this.apollo
      .query<FindAllLivestockResponse>({ query: FIND_ALL_LIVESTOCK })
      .pipe(map(result => result.data));
  }

  // ======= find one livestock ==========
  findOne(id: string):Observable<FindLivestockResponse> {
    return this.apollo
    .query<FindLivestockResponse>({ query: FIND_LIVESTOCK, variables: { id: id }})
    .pipe(map(result => result.data));
  }

   // ======= create livestock ==========
  create(input: ParamsCreateLivestock): Observable<CreateLivestockResponse> {
    return this.apollo
      .mutate<CreateLivestockResponse>({
        mutation: CREATE_LIVESTOCK,
        variables: { input: input },
        refetchQueries: [ {query: FIND_ALL_LIVESTOCK }]
      })
      .pipe(map(result => result.data))
  }

   // ======== edit livestock ==========
  edit(input: ParamsEditLiveStock): Observable<EditLivestockResponse> {
    return this.apollo
      .mutate<EditLivestockResponse>({
        mutation: EDIT_LIVESTOCK,
        variables: { input }
        
      })
      .pipe(map(res => res.data))
  }

   // ======== delete livestock ==========
  delete(input: ParamsDeleteLivestock): Observable<DeleteLivestockResponse> {
    return this.apollo
      .mutate<DeleteLivestockResponse>({
        mutation: DELETE_LIVESTOCK,
        variables: { input },
        refetchQueries: [ {query: FIND_ALL_LIVESTOCK }]
      })
      .pipe(map(res => res.data))
  }

}
