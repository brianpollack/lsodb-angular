import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFindAllCountryResponce, FIND_ALL_COUNTRY, IFindCountryResponce, FIND_COUNTRY, IFindAllCountryStatesResponce, FIND_ALL_COUNTRY_STATES, IFindAllStateResponce } from 'src/app/dashboard-master/grphql/queries/query/countryQuery';
import { IParamsCreateCountry, IParamsEditCountry } from 'src/app/dashboard-master/grphql/interface/countryInterface';
import { CREATE_COUNTRY, EDIT_COUNTRY, IParamsDeleteCountry, DELETE_COUNTRY, IParamsDeleteCountryResponce, IParamsCreateCountryResponce, IParamsEditCountryResponce } from 'src/app/dashboard-master/grphql/queries/mutation/countryMutation';


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
      variables: {countryId }
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

  FindAllStates(): Observable<IFindAllStateResponce> {
    return this.apollo
      .query<IFindAllStateResponce>({ query: FIND_ALL_STATES })
      .pipe(map(result => result.data));
  }

}
