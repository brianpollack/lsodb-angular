export interface IOwner {

    id: string;
    avatar: string;
    oName: string;
    door: string;
    street: string;
    landMark: string;
    pincode: string;
    poPlace: string;
    lat: string;
    log: string;
    village: string;
    taluk: string;
    town: string;
    district: string;
    state: string;
    country: string;
    adhaar: string;
    pan: string;
    phone: string;
    email: string;
    totalLs: string;
  };

  export interface Ownlivestock {
    id: string
    lsName: string
    breedName: string
    lsCount: string
    ownerId: string
  }

  export interface  IParamsCreateOwner {
    avatar: string;
    oName: string;
    door: string;
    street: string;
    landMark: string;
    pincode: string;
    poPlace: string;
    lat: string;
    log: string;
    village: string;
    taluk: string;
    town: string;
    district: string;
    state: string;
    country: string;
    adhaar: string;
    pan: string;
    phone: string;
    email: string;
    
  }

  export interface IParamsEditOwner {
   
    avatar: string;
    oName: string;
    door: string;
    street: string;
    landMark: string;
    pincode: string;
    poPlace: string;
    lat: string;
    log: string;
    village: string;
    taluk: string;
    town: string;
    district: string;
    state: string;
    country: string;
    adhaar: string;
    pan: string;
    phone: string;
    email: string;
    
  }

  export interface IParamsCreateOwnLs {
    ownerId: string
    lsName: string
    breedName: string
    lsCount: string
  }
  export interface IParamsEditOwnLs {
    ownLsId: string
    ownerId: string
    lsName: string
    breedName: string
    lsCount: string
  }
  export interface IParamsDeleteOwnLs {
    ownLsId: string
    ownerId: string
  }