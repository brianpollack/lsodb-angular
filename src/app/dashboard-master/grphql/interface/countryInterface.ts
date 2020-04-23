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
    DistrictId: string
    stateId: string
    district: string
    districtCapital: string
    districtCode: string
    pincode: string
}

export interface IParamsEditTaluk {
    talukId: string
    districtId: string
    taluk: string
    pincode: string
}

export interface IParamsEditTown {
    townId: string
    taluckId: string
    town: string
    pincode: string
}

export interface IParamsEditVillage {
    villageId: string
    townId: string
    village: string
    pincode: string
}