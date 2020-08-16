export interface IOwner {

    id: string;
    avatar: string;
    oName: string;
    door: string;
    street: string;
    landMark: string;
    pincode: string;
    poPlace: string;
    lat: number;
    log: number;
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
    latR: number;
    logR: number;
  };

  export interface Ownlivestock {
    id: string
    lsName: string
    breedName: string
    lsCount: number
    birth: number
    death: number
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
    lat: number;
    log: number;
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
    latR: number;
    logR: number;
    
  }

  export interface IParamsEditOwner {
   
    avatar: string;
    oName: string;
    door: string;
    street: string;
    landMark: string;
    pincode: string;
    poPlace: string;
    lat: number;
    log: number;
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
    latR: number;
    logR: number;
    
  }

  export interface IParamsCreateOwnLs {
    ownerId: string
    lsName: string
    breedName: string
    lsCount: number
  }
  export interface IParamsEditOwnLs {
    ownLsId: string
    ownerId: string
    lsName: string
    breedName: string
    lsCount: number
  }
  export interface IParamsDeleteOwnLs {
    ownLsId: string
    ownerId: string
  }
  export interface IParamsSearchOwner {
    page : number
    limit: number
    latR: number
    logR: number

  }

  export interface IParamsCreatLivespan {
    ownLsId: String
    ownerId: String
    birth: number
    death: number
  }