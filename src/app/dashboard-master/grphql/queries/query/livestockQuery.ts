import gql from 'graphql-tag'
import { Livestock } from '../../interface/livestockInterface';

export const FIND_ALL_LIVESTOCK  = gql`

query FindAllLivestock {
    FindAllLivestock{
      id
      livestockName
      breedCount
      breeds{
        id
        breedName
      }
    }
  }
`;

export const FIND_LIVESTOCK = gql`
query FindLivestock($id: ID!) {
    FindLivestock(id: $id) {
      id
      livestockName
      breedCount
      breeds {
        id
        breedName
      }
    }
  }
`;  

export interface FindAllLivestockResponse {
    FindAllLivestock: Livestock[];   
}

export interface FindLivestockResponse {
    FindLivestock: Livestock;  
}