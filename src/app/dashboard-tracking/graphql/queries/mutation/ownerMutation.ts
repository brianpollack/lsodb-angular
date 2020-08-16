import gql from 'graphql-tag'
import { IOwner } from '../../interface/ownerInterface';

export const CREATE_OWNER = gql`
mutation CreateOwner($input: ParamsCreateOwner ){
    CreateOwner(input: $input){      
      id
      avatar
      oName
      door
      street
      landMark
      pincode
      poPlace
      lat
      log
      village
      taluk
      town
      district
      state
      country
      adhaar
      pan
      phone
      email
    }
  }

`;
export const EDIT_OWNER = gql`
mutation  EditOwner($id: String, $input: ParamsEditOwner){
  EditOwner(id:$id, input:$input){
    id
    avatar
    oName
    door
    street
    landMark
    pincode
    poPlace
    lat
    log
    village
    taluk
    town
    district
    state
    country
    adhaar
    pan
    phone
    email
    
  }
}
`;
export const DELETE_OWNER = gql`
mutation DeleteOwner($id: String!){
  DeleteOwner(id:$id){
    id
   
  }
}
`;


export interface ICreateOwner {
    CreateOwner : IOwner
}
 export interface IEditOwner {
  EditOwner : IOwner
} 
export interface IDeleteOwner {
    DeleteOwner : IOwner
}

