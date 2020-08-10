import gql from "graphql-tag";
import { IOwner } from "../../interface/ownerInterface";

export const FIND_ALL_OWNERS = gql`
  query {
    FindAllOwners {
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
      totalLs
    }
  }
`;

export const FIND_OWNER = gql`
  query {
    FindOwner(id: "5ee7080bcd0cff2258eca677") {
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
      totalLs
    }
  }
`;

export const SEARCH_OWNER = gql`
  query SearchOwner($input: ParamsSearchOwner) {
    SearchOwner(input: $input) {
      id
      oName
      door
      street
      landMark
      pincode
      poPlace
      lat
      log
      totalLs
      ownLivestocks {
        id
        lsName
        breedName
        lsCount
        birth
        death
        ownerId
      }
    }
  }
`;

export interface IFindAllOwners {
  FindAllOwners: IOwner[];
}
export interface IFindOwner {
  FindOwner: IOwner;
}

export interface ISearchOwner {
  SearchOwner: IOwner[];
}
