import gql from "graphql-tag";
import { Ownlivestock } from '../../interface/ownerInterface';


  export const  FIND_ALL_OLIVESTOCKS = gql`
  query  FindAllOwnLivestocks{
    FindAllOwnLivestocks{
      id
      lsName
      breedName
      lsCount
      ownerId
    }
  }
  `

  export const  FIND_OLIVESTOCK = gql`
  query  FindOwnLivestock($id: String!){
    FindOwnLivestock(id:$id){
      id
       lsName
      breedName
      lsCount
      ownerId
    }
  }`


  export const FIND_OWNWESLS = gql `
query FindAllOwnersLs($ownerId: String) {
    FindAllOwnersLs(ownerId: $ownerId) {
      id
      lsName
      breedName
      lsCount
      
    }
  }
  `

  export interface IFindAllOLivestocks {
    FindAllOwnLivestocks: [Ownlivestock]
  }
  export interface IFindOLivestock {
    FindOwnLivestock: Ownlivestock
  }
  export interface IFindOwnersLs {
    FindAllOwnersLs: [Ownlivestock]
  }
