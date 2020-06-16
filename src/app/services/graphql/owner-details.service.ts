import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFindAllOwners, FIND_ALL_OWNERS, IFindOwner, FIND_OWNER } from 'src/app/dashboard-tracking/graphql/queries/query/ownerQuery';
import { IParamsCreateOwner } from 'src/app/dashboard-tracking/graphql/interface/ownerInterface';
import { ICreateOwner, CREATE_OWNER, IDeleteOwner, DELETE_OWNER } from 'src/app/dashboard-tracking/graphql/queries/mutation/ownerMutation';

@Injectable({
  providedIn: 'root'
})
export class OwnerDetailsService {

  constructor(
    private apollo: Apollo
  ) { }

   // ======= find Owner ==========
  findAllOwner(): Observable<IFindAllOwners> {
    return this.apollo
      .query<IFindAllOwners>({ query: FIND_ALL_OWNERS })
      .pipe(map(result => result.data));
  }

  // ======= find one Owner ==========
  findOneOwner(id: string): Observable<IFindOwner> {
    return this.apollo
      .query<IFindOwner>({ query: FIND_OWNER, variables: { id: id } })
      .pipe(map(result => result.data));
  }

// ======== create Owner ==========
  createOwner(input: IParamsCreateOwner): Observable<ICreateOwner> {
    return this.apollo
      .mutate<ICreateOwner>({
        mutation: CREATE_OWNER,
        variables: { input: input },
       
        refetchQueries: [{ query: FIND_ALL_OWNERS }]
          
      })
      .pipe(map(result => result.data))
  }
  // ======== edit Owner ==========
  /* editOwner(input: IParamsEditOwner): Observable<EditLivestockResponse> {
    return this.apollo
      .mutate<EditLivestockResponse>({
        mutation: EDIT_LIVESTOCK,
        variables: { input }

      })
      .pipe(map(res => res.data))
  }
 */
  // ======== delete Owner ==========
  deleteOwner(input: String): Observable<IDeleteOwner> {
    return this.apollo
      .mutate<IDeleteOwner>({
        mutation: DELETE_OWNER ,
        variables: { input },
        refetchQueries: [{ query: FIND_ALL_OWNERS }]
      })
      .pipe(map(res => res.data))
  }

}
