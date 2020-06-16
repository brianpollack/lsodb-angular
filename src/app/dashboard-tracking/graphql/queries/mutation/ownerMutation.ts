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
/* export const EDIT_OWNER = gql`
`; */
export const DELETE_OWNER = gql`
mutation {
    DeleteOwner(id: "5ee704d1be43771e4c2d30c1"){
      id
    }
  }
`;


export interface ICreateOwner {
    CreateOwner : IOwner
}
/* export interface I {
    : IOwner
} */
export interface IDeleteOwner {
    DeleteOwner : IOwner
}