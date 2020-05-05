export interface ICountry {
    id: string;
    country: string;
    countryCapital: string;
    countryCode: string;
    editMode: string;
}

export interface IState {
    id: string;
    state: string;
    stateCapital: string;
    stateCode: string;
    pincode: string;
    editMode: string;
}

export interface IDistrict {
    id: string;
    district: string;
    districtCapital: string;
    districtCode: string;
    pincode: string;
    editMode: string;
}

export interface ITaluk {
    id: string;
    taluk: string;
    pincode: string;
    editMode: string;
}

export interface ITown {
    id: string;
    town: string;
    pincode: string;
    editMode: string;
}

export interface IVillage {
    id: string;
    village: string;
    pincode: string;
    editMode: string;
}

export interface IParamsCreateCountry {

    country: string
    countryCapital: string
    countryCode: string
}

export interface IParamsCreateState {
    countryId: string
    state: string
    stateCapital: string
    stateCode: string
    pincode: string
}

export interface IParamsCreateDistrict {
    countryId: String
    stateId: string
    district: string
    districtCapital: string
    districtCode: string
    pincode: string


}

export interface IParamsCreateTaluk {
    countryId: String
    districtId: string
    taluk: string
    pincode: string
}

export interface IParamsCreateTown {
    countryId: String
    taluckId: string
    town: string
    pincode: string
}

export interface IParamsCreateVillage {
    countryId: String
    townId: string
    village: string
    pincode: string
}

export interface IParamsEditCountry {
    countryid: string
    country: string
    countryCapital: string
    countryCode: string
}

export interface IParamsEditState {
    countryId: string
    stateId: string
    state: string
    stateCapital: string
    stateCode: string
    pincode: string
}

export interface IParamsEditDistrict {
    countryId: String
    districtId: String
    district: String
    districtCapital: String
    districtCode: String
    pincode: String
}

export interface IParamsEditTaluk {
    countryId: String
    talukId: string
    taluk: string
    pincode: string
}

export interface IParamsEditTown {
    countryId: String
    townId: string
    town: string
    pincode: string
}

export interface IParamsEditVillage {
    countryId: String
    villageId: string
    village: string
    pincode: string
}


export interface IParamsInsertState{
    countryId: String
    state: String
    stateCapital: String
    stateCode: String
    pincode: String
  }