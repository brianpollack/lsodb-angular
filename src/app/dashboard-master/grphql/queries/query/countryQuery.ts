import gql from 'graphql-tag'
import { ICountry, IState } from './../../interface/countryInterface';

export const FIND_ALL_COUNTRY = gql`
query{
    FindAllCountry{
      id
      country
      countryCapital
      countryCode
    }
  }
`;

export const FIND_COUNTRY = gql`
query FindCountry($id: String!){
    FindCountry(id: $id) {
      id
      country
      countryCapital
      countryCode
    }
  }
`;

export const FIND_ALL_COUNTRY_STATES  = gql`
query FindAllCountryStates($countryId:String){
  FindAllCountryStates(countryId:$countryId ){
    id
    countryId
    state
    stateCapital
  }
}
`;

export const FIND_ALL_STATES = gql`
query{
  FindAllState{
    id
    countryId
    state
    stateCapital
    stateCode
    pincode
  }
}`;

export interface IFindAllCountryResponce  {
  FindAllCountry: ICountry[]
}

export interface IFindCountryResponce  {
  FindCountry: ICountry
}
export interface IFindAllCountryStatesResponce  {
  FindAllCountryStates: IState[]
}

export interface IFindAllStateResponce  {
  FindAllState: IState[]
}

