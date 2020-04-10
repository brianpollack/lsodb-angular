import gql from 'graphql-tag'
import { IBreed } from '../../interface/breedInterface';

export const FIND_ALL_BREED = gql`
query{
    FindAllBreed{
      id
      breedName
      livestock{
        livestockId
      }
    }
  }

`;

export const FIND_BREED = gql`
query FindBreed($id: ID!) {
    FindBreed(id: $id) {
      id
      breedName
    }
  }
`;

export const FIND_ALL_LIVESTOCK_BREEDS = gql`
query FindAllLivestockBreeds($livestockId: String ){
    FindAllLivestockBreeds(livestockId: $livestockId){
      id
      breedName
      livestock{
        livestockId
      }
    }
  }
`;


export interface IFindAllBreedResponse {
    FindAllBreed: IBreed[];   
}

export interface IFindBreedResponse {
    FindBreed: IBreed;  
}
export interface IFindAllLivestockBreeds {
  FindAllLivestockBreeds: IBreed[];  
}