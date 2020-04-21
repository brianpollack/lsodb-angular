import gql from 'graphql-tag'
import { ICountry, IState } from './../../interface/countryInterface';

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

