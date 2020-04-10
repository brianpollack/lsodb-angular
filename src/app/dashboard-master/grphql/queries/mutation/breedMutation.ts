import gql from 'graphql-tag'
import { IBreed } from '../../interface/breedInterface';

export const CREATE_BREED = gql`
mutation CreateBreed ($input: ParamsCreateBreeds! ){
    CreateBreed(input: $input){
      id
      breedName
      livestock{
        livestockId
      }
    }
  }
`;

export const EDIT_BREED =gql`
mutation EditBreed($input: ParamsEditBreed ){
    EditBreed(input: $input){
      id
      breedName
      
    }
  }
`;

export const DELETE_BREED =gql`
mutation DeleteBreed($input: ParamsDeleteBreed) {
    DeleteBreed(input: $input) {
      id
    }
  }
`;

export interface ICreateBreedResponse {
    CreateBreed: IBreed;
  }
  export interface IEditBreedResponse {
    EditBreed: IBreed;
  }
  export interface IDeleteBreedResponse {
    DeleteBreed: IBreed;
  }