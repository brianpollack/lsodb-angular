import gql from 'graphql-tag'
import { ICountry, IState, IDistrict, ITaluk, ITown, IVillage } from './../../interface/countryInterface';
import { CREATE_BREED } from 'src/app/dashboard-master/grphql/queries/mutation/breedMutation';



/* ******************** country **************************** */
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

/* ******************** State **************************** */

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
export const INSERT_ALL_STATES = gql`
mutation  InsertState($input: [ParamsInsertState]){
  InsertState(input: $input){
    id
    state
    countryId
    stateCapital
    stateCode
    pincode
  }
}
`;
/* ******************** District **************************** */
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


export const INSERT_ALL_DISTRICT = gql`
mutation  InsertDistrict($input: [ParamsCreateDistrict]){
  InsertDistrict(input: $input){
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

export const EDIT_DISTRICT = gql`
mutation editDistrict($input: ParamsEditDistrict) {
  EditDistrict(input: $input) {
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
export const DELETE_DISTRICT = gql`
mutation Deletedistrict($countryId: String!, $DistrictId: String!) {
  DeleteDistrict(countryId: $countryId, DistrictId: $DistrictId) {
    id
    district
    districtCapital
  }
}
`;


/* ******************** Taluk **************************** */

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

export const INSERT_ALL_TALUK = gql`
mutation  InsertTaluk($input: [ParamsCreateTaluk]){
  InsertTaluk(input: $input){
    id
    countryId
    districtId
    taluk
  }
}
`;


export const EDIT_TALUK = gql`
mutation EditTaluk($input: ParamsEditTaluk){
  EditTaluk(input: $input){
    id
    countryId
    districtId
    taluk
    pincode
  }
}
`;
export const DELETE_TALUK = gql`
mutation DeleteTaluk($countryId: String!, $talukId: String!) {
  DeleteTaluk(countryId: $countryId, talukId: $talukId) {
    id
    taluk
    pincode
  }
}
`;

/* ******************** Town **************************** */

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

export const INSERT_ALL_TOWN = gql`
mutation  InsertTown($input: [ParamsCreateTown]){
  InsertTown(input: $input){
    id
    countryId
    taluckId
    town
    pincode
  }
}
`;
export const EDIT_TOWN = gql`
mutation EditTown($input: ParamsEditTown){
  EditTown(input: $input){
    id
    countryId
    taluckId
    town
    pincode
    
  }
}
`;
export const DELETE_TOWN =  gql`
mutation DeleteTown($countryId: String!, $townId: String!) {
  DeleteTown(countryId: $countryId, townId: $townId) {
    id
  town
  }
}
`;

/* ******************** Village **************************** */
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
export const INSERT_ALL_VILLAGE = gql`
mutation InsertVillage($input: [ParamsCreateVillage]) {
  InsertVillage(input: $input) {
    id
    countryId
    townId
    village
    pincode
  }
}

`;

export const EDIT_VILLAGE = gql`
mutation EditVillage($input: ParamsEditVillage){
  EditVillage(input: $input){
    id
    countryId
    townId
    village
    pincode
  }
}
`;
export const DELETE_VILLAGE =  gql`
mutation DeleteVillage($countryId: String!, $villageId: String!) {
  DeleteVillage(countryId: $countryId, villageId: $villageId) {
    id
  village
  }
}
`;

/* ******************** country **************************** */
export interface IParamsCreateCountryResponce {
    CreateCountry: ICountry
}
export interface IParamsEditCountryResponce {
    EditCountry: ICountry
}
export interface IParamsDeleteCountryResponce {
  DeleteCountry: ICountry
}

/* ******************** state **************************** */
export interface IParamsCreateStateResponce {
    CreateState: IState
}

export interface IParamsEditStateResponce {
    EditState: IState
}
export interface IParamsDeleteStateResponce {
  DeleteState: IState
}
export interface IParamsInsertStateResponce {
  InsertState: [IState]
}
/* ******************** district **************************** */

export interface IParamsCreateDistrictResponce {
  CreateDistrict : IDistrict
}

export interface IParamsEditDistrictResponce {
  EditDistrict: IDistrict
}
export interface IParamsDeleteDistrictResponce {
  DeleteDistrict: IDistrict
}

export interface IParamsInsertDistrictResponce {
  InsertDistrict: [IDistrict]
}




/* ******************** taluk **************************** */
export interface IParamsCreateTalukResponce {
  CreateTaluk : ITaluk
}

export interface IParamsInsertTalukResponce {
  InsertTaluk: [ITaluk]
}

export interface IParamsEditalukResponce {
  EditTaluk: ITaluk
}

export interface IParamsDeleteTalukResponce {
  DeleteTaluk: ITaluk
}

/* ******************** town **************************** */
export interface IParamsCreateTownResponce {
  CreateTown : ITown
}

export interface IParamsInsertTownResponce {
  InsertTown: [ITown]
}

export interface IParamsEditTownResponce {
  EditTown: ITown
}
export interface IParamsDeleteTownResponce {
  DeleteTown: ITown
}

/* ******************** village **************************** */
export interface IParamsCreateVillageResponce {
  CreateVillage : IVillage
}

export interface IParamsInsertVillageResponce {
  InsertVillage: [IVillage]
}
export interface IParamsEditVillageResponce {
  EditVillage: IVillage
}
export interface IParamsDeleteVillageResponce {
  DeleteVillage: IVillage
}



