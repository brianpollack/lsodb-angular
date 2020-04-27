import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindAllLivestockResponse, FindLivestockResponse, FIND_ALL_LIVESTOCK, FIND_LIVESTOCK } from 'src/app/dashboard-master/grphql/queries/query/livestockQuery';
import { Livestock, ParamsCreateLivestock, ParamsEditLiveStock, ParamsDeleteLivestock } from './../../dashboard-master/grphql/interface/livestockInterface';
import { CreateLivestockResponse, CREATE_LIVESTOCK, EDIT_LIVESTOCK, EditLivestockResponse, DeleteLivestockResponse, DELETE_LIVESTOCK } from 'src/app/dashboard-master/grphql/queries/mutation/livestockMutation';
import {  FIND_ALL_BREED, FIND_BREED, IFindAllBreedResponse, IFindBreedResponse, IFindAllLivestockBreeds, FIND_ALL_LIVESTOCK_BREEDS } from './../../dashboard-master/grphql/queries/query/breedQuery';
import { IParamsCreateBreeds, IParamsEditBreed, IParamsDeleteBreed } from 'src/app/dashboard-master/grphql/interface/breedInterface';
import { ICreateBreedResponse, CREATE_BREED, IEditBreedResponse, IDeleteBreedResponse, EDIT_BREED, DELETE_BREED } from 'src/app/dashboard-master/grphql/queries/mutation/breedMutation';
import { IFindAllUsersResponce, FIND_ALL_USER, IFindUserResponce, FIND_USER } from './../../dashboard-master/grphql/queries/query/userQurey';
import { ParamsCreateUser, ParamsEditUser } from 'src/app/dashboard-master/grphql/interface/userInterface';
import { ICreateUserResponse, CREATE_USER, IEditUserResponse, EDIT_USER, DELETE_USER, IDeleteUserResponse } from 'src/app/dashboard-master/grphql/queries/mutation/userMutation';




@Injectable({
  providedIn: 'root'
})
export class MasterfileService {

  livestocks: Livestock[]
  constructor(
    private apollo: Apollo
  ) { }
// ****************** livestock service starts **********************
  // ======== find all livestock =======
  findAll(): Observable<FindAllLivestockResponse> {
    return this.apollo
      .query<FindAllLivestockResponse>({ query: FIND_ALL_LIVESTOCK })
      .pipe(map(result => result.data));
  }

  // ======= find one livestock ==========
  findOne(id: string): Observable<FindLivestockResponse> {
    return this.apollo
      .query<FindLivestockResponse>({ query: FIND_LIVESTOCK, variables: { id: id } })
      .pipe(map(result => result.data));
  }

  // ======= create livestock ==========
  create(input: ParamsCreateLivestock): Observable<CreateLivestockResponse> {
    return this.apollo
      .mutate<CreateLivestockResponse>({
        mutation: CREATE_LIVESTOCK,
        variables: { input: input },
       
        refetchQueries: [{ query: FIND_ALL_LIVESTOCK }]
          
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
        refetchQueries: [{ query: FIND_ALL_LIVESTOCK }]
      })
      .pipe(map(res => res.data))
  }
// ****************** livestock service ends **********************
// ****************** Breed service starts **********************

  findAllBreed(): Observable<IFindAllBreedResponse> {
    return this.apollo
      .query<IFindAllBreedResponse>({ query: FIND_ALL_BREED })
      .pipe(map(result => result.data));
  }

  findOneBreed(id: string): Observable<IFindBreedResponse> {
    return this.apollo
      .query<IFindBreedResponse>({ query: FIND_BREED, variables: { id: id } })
      .pipe(map(result => result.data));
  }
  findOnlyBreeds(livestockId: string): Observable<IFindAllLivestockBreeds> {
    return this.apollo
      .query<IFindAllLivestockBreeds>({ 
        query: FIND_ALL_LIVESTOCK_BREEDS, 
        variables: { livestockId },
        // fetchPolicy: 'network-only'                
       })
      .pipe(map(result => result.data));
  }

  createBreed(input: IParamsCreateBreeds, livestockId: string): Observable<ICreateBreedResponse> {
    return this.apollo
      .mutate<ICreateBreedResponse>({
        mutation: CREATE_BREED,
        variables: { input: input },
        update: (store, { data: {CreateBreed} }) =>{
          this.updateMemoryBreed(store, { data: {CreateBreed} }, livestockId );
       }
      })
      .pipe(map(result => result.data))
  }

  editBreed(input: IParamsEditBreed, livestockId: string): Observable<IEditBreedResponse> {
    return this.apollo
      .mutate<IEditBreedResponse>({
        mutation: EDIT_BREED,
        variables: { input },
        update: (store, { data: {CreateBreed} }) =>{
          this.updateMemoryBreed(store, { data: {CreateBreed} }, livestockId );
       }
      })
      .pipe(map(res => res.data))
  }

  deleteBreed(input: IParamsDeleteBreed, livestockId: string): Observable<IDeleteBreedResponse> {
    return this.apollo
      .mutate<IDeleteBreedResponse>({
        mutation: DELETE_BREED,
        variables: { input },
        refetchQueries: [{ query: FIND_ALL_LIVESTOCK_BREEDS, variables: { livestockId } }]
      })
      .pipe(map(res => res.data))
  }



  updateMemoryBreed(store, { data: {CreateBreed} }, livestockId){
    const data = store.readQuery(
      {
      query: FIND_ALL_LIVESTOCK_BREEDS,
      variables: { livestockId }
    }
    );
   
    data.FindAllLivestockBreeds = [...data.FindAllLivestockBreeds, CreateBreed ]

    store.writeQuery({
     query: FIND_ALL_LIVESTOCK_BREEDS,
     variables: { livestockId },
     data
    })

  }
  // ****************** Breed service ends **********************

  // ****************** User service starts ********************

  findUser(): Observable<IFindAllUsersResponce> {

    return this.apollo
    .query<IFindAllUsersResponce>({
      query: FIND_ALL_USER
    }).pipe(map(res => res.data))
  }

  findOneUser(id: string): Observable<IFindUserResponce> {

    return this.apollo
    .query<IFindUserResponce>({
      query: FIND_USER,
      variables: {id }
    }).pipe(map(res => res.data))
  }

  createUser(input: ParamsCreateUser): Observable<ICreateUserResponse> {
    return this.apollo
    .mutate<ICreateUserResponse>({
      mutation: CREATE_USER,
      variables: {input},
      refetchQueries: [{query: FIND_ALL_USER}]
    })
    .pipe(map(res => res.data))
  }
  editUser(input: ParamsEditUser): Observable<IEditUserResponse> {
    return this.apollo
    .mutate<IEditUserResponse>({
      mutation: EDIT_USER,
      variables: { input },
      refetchQueries: [{query: FIND_ALL_USER }]
    })
    .pipe(map(res => res.data))
  }
  deleteUser(id: string): Observable<IDeleteUserResponse>{
    return this.apollo
    .mutate<IDeleteUserResponse>({
      mutation: DELETE_USER,
      variables: {id},
      refetchQueries: [{query: FIND_ALL_USER }]
    })
    .pipe(map(res=>res.data))

  }
}
