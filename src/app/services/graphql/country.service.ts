import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFindAllCountryResponce, FIND_ALL_COUNTRY, IFindCountryResponce, FIND_COUNTRY, IFindAllCountryStatesResponce, FIND_ALL_COUNTRY_STATES, IFindAllStateResponce, FIND_ALL_STATES, IFindAllStateDistrictsResponce, FIND_ALL_STATE_DISTRICTS, IFindAllDistrictsTaluksResponce, FIND_ALL_DISTRICTS_TALUKS, IFindAllTalukTalukResponce, FIND_ALL_TALUKS_TOWNS, IFindAllTalukVillageResponce, FIND_ALL_TOWN_VILLAGE } from 'src/app/dashboard-master/grphql/queries/query/countryQuery';
import { IParamsCreateCountry, IParamsEditCountry, IParamsCreateState, IParamsEditState, IParamsCreateTaluk, IParamsCreateVillage, IParamsEditTaluk, IParamsEditVillage, IParamsInsertState } from 'src/app/dashboard-master/grphql/interface/countryInterface';
import { CREATE_COUNTRY, EDIT_COUNTRY, DELETE_COUNTRY, IParamsDeleteCountryResponce, IParamsCreateCountryResponce, IParamsEditCountryResponce, IParamsCreateStateResponce, CREATE_STATE, IParamsEditStateResponce, EDIT_STATE, IParamsDeleteStateResponce, DELETE_STATE, IParamsCreateDistrictResponce, IParamsEditDistrictResponce, IParamsDeleteDistrictResponce, DELETE_DISTRICT, CREATE_District, IParamsCreateTalukResponce, CREATE_TALUK, IParamsCreateTownResponce, CREATE_TOWN, IParamsCreateVillageResponce, CREATE_VILLAGE, IParamsDeleteVillageResponce, DELETE_VILLAGE, IParamsDeleteTownResponce, DELETE_TOWN, DELETE_TALUK, IParamsDeleteTalukResponce, EDIT_DISTRICT, IParamsEditalukResponce, IParamsEditTownResponce, EDIT_TOWN, IParamsInsertStateResponce, INSERT_ALL_STATES, IParamsInsertDistrictResponce, IParamsInsertTalukResponce, IParamsInsertTownResponce, IParamsInsertVillageResponce, INSERT_ALL_TALUK } from 'src/app/dashboard-master/grphql/queries/mutation/countryMutation';
import { IParamsCreateDistrict, IParamsEditDistrict, IParamsCreateTown, IParamsEditTown } from './../../dashboard-master/grphql/interface/countryInterface';
import { EDIT_TALUK, IParamsEditVillageResponce, EDIT_VILLAGE, INSERT_ALL_TOWN, INSERT_ALL_VILLAGE, INSERT_ALL_DISTRICT } from './../../dashboard-master/grphql/queries/mutation/countryMutation';


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
    .pipe(map(res=>{
      if(res && res['data']){
        return res.data
      } else {
        console.log(res);
        throw(res);
      }
    }))

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
  // ======== insert State =======
  insertState(input: IParamsInsertState[], countryId:String): Observable<IParamsInsertStateResponce> {
    return this.apollo
    .mutate<IParamsInsertStateResponce>({
      mutation: INSERT_ALL_STATES,
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

    // ======== create District =======
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

  insertDistrict(input: IParamsCreateDistrict[], stateId:String): Observable<IParamsInsertDistrictResponce> {
    return this.apollo
    .mutate<IParamsInsertDistrictResponce>({
      mutation: INSERT_ALL_DISTRICT,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
        variables: {stateId }}]
    })
    .pipe(map(res => res.data))
  }
  // ======== Edit  District =======
  editDistrict(input: IParamsEditDistrict, stateId:String): Observable<IParamsEditDistrictResponce> {
    return this.apollo
    .mutate<IParamsEditDistrictResponce>({
      mutation: EDIT_DISTRICT,
      variables: { input },
      refetchQueries: [{ query: FIND_ALL_STATE_DISTRICTS,
        variables: {stateId }}]
    })
    .pipe(map(res => res.data))
  }

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
      refetchQueries: [{ query: FIND_ALL_DISTRICTS_TALUKS,
        variables: {districtId }}]
    })
    .pipe(map(res => res.data))
  }

  insertTaluk(input: IParamsCreateTaluk[], districtId:String): Observable<IParamsInsertTalukResponce> {
    return this.apollo
    .mutate<IParamsInsertTalukResponce>({
      mutation: INSERT_ALL_TALUK,
      variables: {input},
      refetchQueries: [{ query:FIND_ALL_DISTRICTS_TALUKS,
        variables: {districtId }}]
    })
    .pipe(map(res => res.data))
  } 
 // ======== Edit  taluk =======
 editTaluk(input: IParamsEditTaluk, districtId:String): Observable<IParamsEditalukResponce> {
  return this.apollo
  .mutate<IParamsEditalukResponce>({
    mutation: EDIT_TALUK,
    variables: { input },
    refetchQueries: [{ query: FIND_ALL_DISTRICTS_TALUKS,
      variables: {districtId }}]
  })
  .pipe(map(res => res.data))
}

  // ======== Delete taluk =======
  deleteTaluk(countryId: String,  talukId:String ,districtId: String ): Observable<IParamsDeleteTalukResponce>{
    return this.apollo
    .mutate<IParamsDeleteTalukResponce>({
      mutation: DELETE_TALUK,
      variables: {countryId, talukId},
      refetchQueries: [{ query: FIND_ALL_DISTRICTS_TALUKS,
        variables: {districtId }}]
    })
    .pipe(map(
      res=>res.data
      ))
    

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
      refetchQueries: [{ query: FIND_ALL_TALUKS_TOWNS,
        variables: {talukId }}]
    })
    .pipe(map(res => res.data))
  }

  insertTown(input: IParamsCreateTown[], taluckId:String): Observable<IParamsInsertTownResponce> {
    return this.apollo
    .mutate<IParamsInsertTownResponce>({
      mutation: INSERT_ALL_TOWN,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_TALUKS_TOWNS,
        variables: {taluckId }}]
    })
    .pipe(map(res => res.data))
  }

   // ======== Edit  town =======
 editTown(input: IParamsEditTown, taluckId:String): Observable<IParamsEditTownResponce> {
  return this.apollo
  .mutate<IParamsEditTownResponce>({
    mutation: EDIT_TOWN,
    variables: { input },
    refetchQueries: [{ query: FIND_ALL_TALUKS_TOWNS,
      variables: {taluckId }}]
  })
  .pipe(map(res => res.data))
}

  // ======== Delete Town =======
  deleteTown(countryId: String,  townId:String ,taluckId: String ): Observable<IParamsDeleteTownResponce>{
    return this.apollo
    .mutate<IParamsDeleteTownResponce>({
      mutation: DELETE_TOWN,
      variables: {countryId, townId},
      refetchQueries: [{ query: FIND_ALL_TALUKS_TOWNS,
        variables: {taluckId }}]
    })
    .pipe(map(
      res=>res.data
      ))
    

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
  createVillage(input: IParamsCreateVillage, townId:String): Observable<IParamsCreateVillageResponce> {
    return this.apollo
    .mutate<IParamsCreateVillageResponce>({
      mutation: CREATE_VILLAGE,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_TOWN_VILLAGE,
        variables: {townId }}]
    })
    .pipe(map(res => res.data))
  }

  insertVillage(input: IParamsCreateVillage[], townId:String): Observable<IParamsInsertVillageResponce> {
    return this.apollo
    .mutate<IParamsInsertVillageResponce>({
      mutation: INSERT_ALL_VILLAGE,
      variables: {input},
      refetchQueries: [{ query: FIND_ALL_TOWN_VILLAGE,
        variables: {townId }}]
    })
    .pipe(map(res => res.data))
  }

   // ======== Edit  village =======
 editvillage(input: IParamsEditVillage, townId:String): Observable<IParamsEditVillageResponce> {
  return this.apollo
  .mutate<IParamsEditVillageResponce>({
    mutation: EDIT_VILLAGE,
    variables: { input },
    refetchQueries: [{ query: FIND_ALL_TOWN_VILLAGE,
      variables: {townId }}]
  })
  .pipe(map(res => res.data))
}

  // ======== Delete village =======
  deleteVillage(countryId: String,  villageId:String ,townId: String ): Observable<IParamsDeleteVillageResponce>{
    return this.apollo
    .mutate<IParamsDeleteVillageResponce>({
      mutation: DELETE_VILLAGE,
      variables: {countryId, villageId},
      refetchQueries: [{ query: FIND_ALL_TOWN_VILLAGE,
        variables: {townId }}]
    })
    .pipe(map(res=>res.data))

  }
}
