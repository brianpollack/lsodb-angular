import gql from 'graphql-tag'
import { IUser } from './../../../../models/user';
import { IUsers } from '../../interface/userInterface';

export const CREATE_USER = gql`
mutation CreateUser($input: ParamsCreateUser){
    CreateUser(input: $input){
      id
      userName
      email
      password
    }
  }
`;
export const EDIT_USER = gql`
mutation EditUser($input: ParamsEditUser){
    EditUser(input:$input){
      id
      userName
      email
      password
    }
  }
`;
export const DELETE_USER= gql`
mutation DeleteUser($id: String!){
    DeleteUser(id:$id){
      id
      userName
    }
  }
`;

export interface ICreateUserResponse {
    CreateUser: IUsers
}
export interface IEditUserResponse {
    EditUser: IUsers
}
export interface IDeleteUserResponse {
    DeleteUser: IUsers
}