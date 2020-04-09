import gql from 'graphql-tag';
import { Livestock } from '../../interface/livestockInterface';

export const CREATE_LIVESTOCK = gql`
mutation
  CreateLivestock($input: ParamsCreateLivestock!){
    CreateLivestock(input: $input){
      id
      livestockName
    }
  }
`;

export const EDIT_LIVESTOCK =gql `

mutation EditLivestock($input: ParamsEditLiveStock){
    EditLivestock(input: $input){
      id
      livestockName
    }
  }
  `;
  export const DELETE_LIVESTOCK = gql `
  mutation DeleteLivestock($input: ParamsDeleteLivestock) {
    DeleteLivestock(input: $input) {
      id
    }
  }
  `;

  export interface CreateLivestockResponse {
    CreateLivestock: Livestock;
  }
  export interface EditLivestockResponse {
    EditLivestock: Livestock;
  }

  export interface DeleteLivestockResponse {
   DeleteLivestock: Livestock;

  }