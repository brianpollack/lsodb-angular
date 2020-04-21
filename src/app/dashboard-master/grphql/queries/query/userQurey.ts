import gql from 'graphql-tag'
import { IUser } from './../../../../models/user';
import { IUsers } from './../../interface/userInterface';


export const FIND_ALL_USER = gql`
query{
    FindAllUsers{
      id
      userName
      email
      password
    }
  }
`;

export const FIND_USER = gql`
query
  FindUser($id: String!){
  FindUser(id:$id){
    id
    userName
    email
    password
  }
}
`;

export interface IFindAllUsersResponce  {
    FindAllUsers: IUsers[]
}

export interface IFindUserResponce  {
    FindUser: IUsers
}