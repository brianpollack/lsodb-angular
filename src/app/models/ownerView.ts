export interface IownerView {
  id: string;
  avatar: String;
  oName: String;
  door: String;
  street: String;
  landMark: String;
  pincode: String;
  poPlace: String;
  lat: String;
  log: String;
  village: String;
  taluk: String;
  town: String;
  district: String;
  state: String;
  country: String;
  adhaar: String;
  pan: String;
  phone: String;
  email: String;
  totalLs: String;
  editmode: String;
}

export interface ILsData {
  id: string;
  lsName: String;
  breedName: String;
  lsCount: String;
  ownerId: String;
  editmode: String;
  breedList: any;
}
