import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  IFindAllOwners,
  FIND_ALL_OWNERS,
  IFindOwner,
  FIND_OWNER,
} from "src/app/dashboard-tracking/graphql/queries/query/ownerQuery";
import {
  IParamsCreateOwner,
  IParamsEditOwner,
  IParamsCreateOwnLs,
  IParamsEditOwnLs,
  IParamsDeleteOwnLs,
} from "src/app/dashboard-tracking/graphql/interface/ownerInterface";
import {
  ICreateOwner,
  CREATE_OWNER,
  IDeleteOwner,
  DELETE_OWNER,
  EDIT_OWNER,
  IEditOwner,
} from "src/app/dashboard-tracking/graphql/queries/mutation/ownerMutation";
import { EditLivestockResponse } from "src/app/dashboard-master/grphql/queries/mutation/livestockMutation";
import {
  IFindAllOLivestocks,
  FIND_ALL_OLIVESTOCKS,
  IFindOLivestock,
  FIND_OLIVESTOCK,
  IFindOwnersLs,
  FIND_OWNWESLS,
} from "src/app/dashboard-tracking/graphql/queries/query/ownLsQuery";
import { ICreateOwnLsResponse, CREATE_OWNLS, IEditOwnLsResponse, EDIT_OWNLS, IDeleteOwnLsResponse, DELETE_OWNLS } from 'src/app/dashboard-tracking/graphql/queries/mutation/ownLsMutation';

@Injectable({
  providedIn: "root",
})
export class OwnerDetailsService {
  constructor(private apollo: Apollo) {}

  // ======= find Owner ==========
  findAllOwner(): Observable<IFindAllOwners> {
    return this.apollo
      .query<IFindAllOwners>({ query: FIND_ALL_OWNERS,
        fetchPolicy: 'network-only' 
      })
      .pipe(map((result) => result.data));
  }
  // fetchPolicy: "network-only",
  // ======= find one Owner ==========
  findOneOwner(id: string): Observable<IFindOwner> {
    return this.apollo
      .query<IFindOwner>({ query: FIND_OWNER, variables: { id: id } })
      .pipe(map((result) => result.data));
  }

  // ========== find all livestocks
  findAllOLivestocks(): Observable<IFindAllOLivestocks> {
    return this.apollo
      .query<IFindAllOLivestocks>({
        query: FIND_ALL_OLIVESTOCKS,
      })
      .pipe(map((result) => result.data));
  }
  // ========== find one livestock
  findOLivestock(id: string): Observable<IFindOLivestock> {
    return this.apollo
      .query<IFindOLivestock>({
        query: FIND_OLIVESTOCK,
        variables: { id },
      })
      .pipe(map((result) => result.data));
  }
  // ========== find all owner'sLivestock

  findAllOwnersLs(ownerId: string): Observable<IFindOwnersLs> {
    return this.apollo
      .query<IFindOwnersLs>({
        query: FIND_OWNWESLS,
        variables: { ownerId },
      })
      .pipe(map((result) => result.data));
  }

  // ======== create Owner ==========
  createOwner(input: IParamsCreateOwner): Observable<ICreateOwner> {
    return this.apollo
      .mutate<ICreateOwner>({
        mutation: CREATE_OWNER,
        variables: { input: input },

        refetchQueries: [{ query: FIND_ALL_OWNERS }],
      })
      .pipe(map((result) => result.data));
  }
  // ======== edit Owner ==========
  editOwner(id: String, input: IParamsEditOwner): Observable<IEditOwner> {
    return this.apollo
      .mutate<IEditOwner>({
        mutation: EDIT_OWNER,
        variables: { id, input },
      })
      .pipe(map((res) => res.data));
  }

  // ======== delete Owner ==========
  deleteOwner(id: String): Observable<IDeleteOwner> {
    return this.apollo
      .mutate<IDeleteOwner>({
        mutation: DELETE_OWNER,
        variables: { id },
        refetchQueries: [{ query: FIND_ALL_OWNERS }],
      })
      .pipe(map((res) => res.data));
  }

  /* owner's livestock */

  creatOLivestock(input: IParamsCreateOwnLs ): Observable<ICreateOwnLsResponse> {
    return this.apollo
    .mutate<ICreateOwnLsResponse>({
      mutation: CREATE_OWNLS,
      variables: {input},

      // refetchQueries: [{ query: FIND_ALL_OWNERS }]
    })
    .pipe(map((result) => result.data));
  }

  editOLivestock(ownLsId: string, input: IParamsEditOwnLs): Observable<IEditOwnLsResponse> {
    return this.apollo
    .mutate<IEditOwnLsResponse>({
      mutation: EDIT_OWNLS,
      variables: {ownLsId, input},
      // refetchQueries: [{ query: FIND_ALL_OWNERS }]
    })
    .pipe(map((result) => result.data));
  }
  
  deleteOLivestock(input: IParamsDeleteOwnLs ): Observable<IDeleteOwnLsResponse>{
    return this.apollo
    .mutate<IDeleteOwnLsResponse>({
      mutation: DELETE_OWNLS,
      variables: {input},
      // refetchQueries: [{ query: FIND_ALL_OWNERS }]
    })
    .pipe(map((result) => result.data));
  }
}
