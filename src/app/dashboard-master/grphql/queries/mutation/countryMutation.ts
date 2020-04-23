import gql from 'graphql-tag'
import { ICountry, IState, IDistrict, ITaluk, ITown, IVillage } from './../../interface/countryInterface';
import { CREATE_BREED } from 'src/app/dashboard-master/grphql/queries/mutation/breedMutation';

export const CREATE_COUNTRY = gql`

mutation CreateCountry($input: ParamsCreateCountry) {
    CreateCountry(input: $input){
      id
      country
      countryCapital
      countryCode
    }
  }
`;
export const EDIT_COUNTRY = gql`
mutation EditCountry($input: ParamsEditCountry){
    EditCountry(input: $input){
      id
      country
      countryCapital
      countryCode
    }
  }
`;
export const DELETE_COUNTRY = gql`
mutation DeleteCountry($countryId: String!) {
    DeleteCountry(countryId: $countryId) {
      id
      country
    }
  }
`;

export const CREATE_STATE = gql`
mutation CreateState($input: ParamsCreateState) {
    CreateState(input: $input) {
      id
      countryId
      state
      stateCapital
      stateCode
      pincode
    }
  }
`;

export const EDIT_STATE = gql`
mutation EditState($input: ParamsEditState) {
    EditState(input: $input) {
      id
      countryId
      state
      stateCapital
      stateCode
      pincode
    }
  }
`;
export const DELETE_STATE = gql`
mutation DeleteState($countryId: String!, $StateId: String!) {
    DeleteState(countryId: $countryId, StateId: $StateId) {
      id
      state
      stateCapital
    }
  }
`;

export const CREATE_District = gql`
mutation CreateDistrict($input: ParamsCreateDistrict) {
  CreateDistrict(input: $input) {
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


// export const EDIT_DISTRICT = gql`

// `;

export const DELETE_DISTRICT = gql`
mutation Deletedistrict($countryId: String!, $DistrictId: String!) {
  DeleteDistrict(countryId: $countryId, DistrictId: $DistrictId) {
    id
    district
    districtCapital
  }
}
`;



export const CREATE_TALUK = gql`
mutation CreateTaluk($input: ParamsCreateTaluk) {
  CreateTaluk(input: $input) {
   id
    countryId
   districtId
    taluk
    pincode
  }
}
`;


export const CREATE_TOWN = gql`
mutation CreateTown($input: ParamsCreateTown) {
  CreateTown(input: $input) {
    id
    taluckId
    town
    pincode
  }
}
`;
export const CREATE_VILLAGE =  gql`
mutation CreateVillage($input: ParamsCreateVillage) {
  CreateVillage(input: $input) {
    id
    countryId
    townId
    village
    pincode
  }
}
`;


export interface IParamsCreateCountryResponce {
    CreateCountry: ICountry
}
export interface IParamsEditCountryResponce {
    EditCountry: ICountry
}
export interface IParamsDeleteCountryResponce {
  DeleteCountry: ICountry
}
export interface IParamsCreateStateResponce {
    CreateState: IState
}
export interface IParamsEditStateResponce {
    EditState: IState
}
export interface IParamsDeleteStateResponce {
  DeleteState: IState
}

export interface IParamsCreateDistrictResponce {
  CreateDistrict : IDistrict
}

export interface IParamsEditDistrictResponce {
  EditDistrict: IDistrict
}
export interface IParamsDeleteDistrictResponce {
  DeleteDistrict: IDistrict
}

export interface IParamsCreateTalukResponce {
  CreateTaluk : ITaluk
}
export interface IParamsCreateTownResponce {
  CreateTown : ITown
}
export interface IParamsCreateVillageResponce {
  CreateVillage : IVillage
}



