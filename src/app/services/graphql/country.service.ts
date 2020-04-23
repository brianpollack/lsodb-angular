import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFindAllCountryResponce, FIND_ALL_COUNTRY, IFindCountryResponce, FIND_COUNTRY, IFindAllCountryStatesResponce, FIND_ALL_COUNTRY_STATES, IFindAllStateResponce, FIND_ALL_STATES, IFindAllStateDistrictsResponce, FIND_ALL_STATE_DISTRICTS, IFindAllDistrictsTaluksResponce, FIND_ALL_DISTRICTS_TALUKS, IFindAllTalukTalukResponce, FIND_ALL_TALUKS_TOWNS, IFindAllTalukVillageResponce, FIND_ALL_TOWN_VILLAGE } from 'src/app/dashboard-master/grphql/queries/query/countryQuery';
import { IParamsCreateCountry, IParamsEditCountry, IParamsCreateState, IParamsEditState, IParamsCreateTaluk, IParamsCreateVillage } from 'src/app/dashboard-master/grphql/interface/countryInterface';
import { CREATE_COUNTRY, EDIT_COUNTRY, DELETE_COUNTRY, IParamsDeleteCountryResponce, IParamsCreateCountryResponce, IParamsEditCountryResponce, IParamsCreateStateResponce, CREATE_STATE, IParamsEditStateResponce, EDIT_STATE, IParamsDeleteStateResponce, DELETE_STATE, IParamsCreateDistrictResponce, IParamsEditDistrictResponce, IParamsDeleteDistrictResponce, DELETE_DISTRICT, CREATE_District, EDIT_DISTRICT, IParamsCreateTalukResponce, CREATE_TALUK, IParamsCreateTownResponce, CREATE_TOWN, IParamsCreateVillageResponce, CREATE_VILLAGE } from 'src/app/dashboard-master/grphql/queries/mutation/countryMutation';
import { IParamsCreateDistrict, IParamsEditDistrict, IParamsCreateTown } from './../../dashboard-master/grphql/interface/countryInterface';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private apollo: Apollo
  ) { }

  // ****************** livestock service starts **********************
  // ======== find all country =======
  findAllCountry(): Observable<IFindAllCountryResponce> {
    return this.apollo
      .query<IFindAllCountryResponce>({ query: FIND_ALL_COUNTRY })
      .pipe(map(result => result.data));
  }
// ======== find country =======
  findOneCountry(id: string): Observable<IFindCountryResponce> {

    return this.apollo
    .query<IFindCountryResponce>({
      query: FIND_COUNTRY,
      variables: {id }
    }).pipe(map(res => res.data))
  }
// ======== find country =======
FindAllCountryStates(countryId: string): Observable<IFindAllCountryStatesResponce> {

    return this.apollo
    .query<IFindAllCountryStatesResponce>({
      query: FIND_ALL_COUNTRY_STATES,
      variables: {countryId },
      fetchPolicy: "network-only"
    }).pipe(map(res => res.data))
  }
// ======== create country =======
  createCountry(input: IParamsCreateCountry): Observable<IParamsCreateCountryResponce> {
    return this.apollo
    .mutate<IParamsCreateCountryResponce>({
      mutation: CREATE_COUNTRY,
      variables: {input},
      refetchQueries: [{query: FIND_ALL_COUNTRY}]
    })
    .pipe(map(res => res.data))
  }

  // ======== Edit  country =======
  editCountry(input: IParamsEditCountry): Observable<IParamsEditCountryResponce> {
    return this.apollo
    .mutate<IParamsEditCountryResponce>({
      mutation: EDIT_COUNTRY,
      variables: { input },
      refetchQueries: [{query: FIND_ALL_COUNTRY }]
    })
    .pipe(map(res => res.data))
  }

  // ======== Delete country =======
  deleteCountry(countryId: String): Observable<IParamsDeleteCountryResponce>{
    return this.apollo
    .mutate<IParamsDeleteCountryResponce>({
      mutation: DELETE_COUNTRY,
      variables: {countryId},
      refetchQueries: [{query: FIND_ALL_COUNTRY }]
    })
    .pipe(map(res=>res.data))

  }

  /* *********** state *********************** */
  FindAllStates(): Observable<IFindAllStateResponce> {
    return this.apollo
      .query<IFindAllStateResponce>({ query: FIND_ALL_STATES })
      .pipe(map(result => result.data));
  }

  // ======== create State =======
  createState(input: IParamsCreateState, countryId:String): Observable<IParamsCreateStateResponce> {
    return this.apollo
    .mutate<IParamsCreateStateResponce>({
      mutation: CREATE_STATE,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_COUNTRY_STATES,
        variables: {countryId }}]
    })
    .pipe(map(res => res.data))
  }

  // ======== Edit  country =======
  editState(input: IParamsEditState, countryId:String): Observable<IParamsEditStateResponce> {
    return this.apollo
    .mutate<IParamsEditStateResponce>({
      mutation: EDIT_STATE,
      variables: { input },
      refetchQueries: [{ query: FIND_ALL_COUNTRY_STATES,
        variables: {countryId }}]
    })
    .pipe(map(res => res.data))
  }

  // ======== Delete country =======
  deleteState(countryId: String,StateId:String ): Observable<IParamsDeleteStateResponce>{
    return this.apollo
    .mutate<IParamsDeleteStateResponce>({
      mutation: DELETE_STATE,
      variables: {countryId, StateId},
      refetchQueries: [{ query: FIND_ALL_COUNTRY_STATES,
        variables: {countryId }}]
    })
    .pipe(map(res=>res.data))

  }

    /* *********** District *********************** */

    FindAllStateDistricts(stateId: string): Observable<IFindAllStateDistrictsResponce> {

      return this.apollo
      .query<IFindAllStateDistrictsResponce>({
        query: FIND_ALL_STATE_DISTRICTS,
        variables: {stateId },
        fetchPolicy: "network-only"
      }).pipe(map(res => res.data))
    }

    // ======== create State =======
  createDistrict(input: IParamsCreateDistrict, stateId:String): Observable<IParamsCreateDistrictResponce> {
    return this.apollo
    .mutate<IParamsCreateDistrictResponce>({
      mutation: CREATE_District,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
        variables: {stateId }}]
    })
    .pipe(map(res => res.data))
  }

  // ======== Edit  country =======
  // editDistrict(input: IParamsEditDistrict, stateId:String): Observable<IParamsEditDistrictResponce> {
  //   return this.apollo
  //   .mutate<IParamsEditDistrictResponce>({
  //     mutation: EDIT_DISTRICT,
  //     variables: { input },
  //     refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
  //       variables: {stateId }}]
  //   })
  //   .pipe(map(res => res.data))
  // }

  // ======== Delete country =======
  deleteDistrict(countryId: String, stateId: String , DistrictId:String ): Observable<IParamsDeleteDistrictResponce>{
    return this.apollo
    .mutate<IParamsDeleteDistrictResponce>({
      mutation: DELETE_DISTRICT,
      variables: {countryId, DistrictId},
      refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
        variables: {stateId }}]
    })
    .pipe(map(res=>res.data))

  }



  /* *********** Taluk *********************** */

  FindAllDistrictTaluks(districtId: string): Observable<IFindAllDistrictsTaluksResponce> {

    return this.apollo
    .query<IFindAllDistrictsTaluksResponce>({
      query: FIND_ALL_DISTRICTS_TALUKS,
      variables: {districtId },
      fetchPolicy: "network-only"
    }).pipe(map(res => res.data))
  }
  // ======== create Taluk =======
  createTaluk(input: IParamsCreateTaluk, districtId:String): Observable<IParamsCreateTalukResponce> {
    return this.apollo
    .mutate<IParamsCreateTalukResponce>({
      mutation: CREATE_TALUK,
      variables: {input},
      // refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
      //   variables: {districtId }}]
    })
    .pipe(map(res => res.data))
  }


  /* *********** Town *********************** */
  FindAllTalukTown(taluckId: string): Observable<IFindAllTalukTalukResponce> {

    return this.apollo
    .query<IFindAllTalukTalukResponce>({
      query: FIND_ALL_TALUKS_TOWNS,
      variables: {taluckId },
      fetchPolicy: "network-only"
    }).pipe(map(res => res.data))
  }


  // ======== create Town =======
  createTown(input: IParamsCreateTown, talukId:String): Observable<IParamsCreateTownResponce> {
    return this.apollo
    .mutate<IParamsCreateTownResponce>({
      mutation: CREATE_TOWN,
      variables: {input},
      // refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
      //   variables: {talukId }}]
    })
    .pipe(map(res => res.data))
  }
  /* *********** Village *********************** */

  FindAllTownVillage(townId: string): Observable<IFindAllTalukVillageResponce> {

    return this.apollo
    .query<IFindAllTalukVillageResponce>({
      query: FIND_ALL_TOWN_VILLAGE,
      variables: {townId },
      fetchPolicy: "network-only"
    }).pipe(map(res => res.data))
  }
  // ======== create Village =======
  createVillage(input: IParamsCreateVillage, townID:String): Observable<IParamsCreateVillageResponce> {
    return this.apollo
    .mutate<IParamsCreateVillageResponce>({
      mutation: CREATE_VILLAGE,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
        variables: {townID }}]
    })
    .pipe(map(res => res.data))
  }
}
