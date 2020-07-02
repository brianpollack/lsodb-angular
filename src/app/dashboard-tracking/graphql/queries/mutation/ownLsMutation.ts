import gql from "graphql-tag";
import { Ownlivestock } from '../../interface/ownerInterface';

export const CREATE_OWNLS = gql`
  mutation CreateOwnLivestock($input: ParamsCreateOwnLs) {
    CreateOwnLivestock(input: $input) {
      id
      lsName
      breedName
      lsCount
      ownerId
    }
  }
`;

export const EDIT_OWNLS = gql`
  mutation EditOwnLivestock($ownLsId: String, $input: ParamsEditOwnLs) {
    EditOwnLivestock(ownLsId: $ownLsId, input: $input) {
      lsName
      breedName
      lsCount
      ownerId
    }
  }
`;


export const DELETE_OWNLS = gql`
  mutation DeleteOwnLivestock($input: ParamsDeleteOwnLs) {
    DeleteOwnLivestock(input: $input) {
      id
    }
  }
`;



export interface ICreateOwnLsResponse {
    CreateOwnLivestock: Ownlivestock;
  }
  export interface IEditOwnLsResponse {
    EditOwnLivestock: Ownlivestock;
  }
  export interface IDeleteOwnLsResponse {
    DeleteOwnLivestock: Ownlivestock;
  }