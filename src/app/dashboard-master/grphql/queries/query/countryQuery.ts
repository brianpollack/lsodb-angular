import gql from 'graphql-tag'
import { ICountry, IState, IDistrict, ITaluk, ITown, IVillage } from './../../interface/countryInterface';

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
    stateCode
    pincode
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




export const FIND_ALL_STATE_DISTRICTS = gql`
query FindAllstateDistrict($stateId: String!){
  FindAllStateDistricts(stateId: $stateId ){
    id
    countryId
    stateId
    district
    districtCapital
    districtCode
    pincode
  }
}
`;

export const FIND_ALL_DISTRICTS_TALUKS = gql`

query FindAllDistrictTaluks($districtId: String!){
  FindAllDistrictTaluks(districtId: $districtId ){
    id
    countryId
    districtId
    taluk
    pincode
  }
}`;

export const FIND_ALL_TALUKS_TOWNS = gql`

query FindAllTalukTown($taluckId: String!) {
  FindAllTalukTown(taluckId: $taluckId) {
    id
    countryId
    taluckId
    town
    pincode
  }
}
`;

export const FIND_ALL_TOWN_VILLAGE = gql`
query FindAllTownVillage($townId:String! ) {
  FindAllTownVillage(townId:$townId ){
    id
    countryId
    townId
    village
    pincode
  }
}
`;

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

export interface IFindAllStateDistrictsResponce {
  FindAllStateDistricts: IDistrict[]
}

export interface IFindAllDistrictsTaluksResponce {
  FindAllDistrictTaluks: ITaluk[]
}


export interface IFindAllTalukTalukResponce {
  FindAllTalukTown: ITown[]
}
export interface IFindAllTalukVillageResponce {
  FindAllTownVillage: IVillage[]
}

