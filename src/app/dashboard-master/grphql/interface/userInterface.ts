export interface IUsers {
    id: string;
    userName: string;
    email: string;
    password: string;
    editMode: string;
}

export interface ParamsCreateUser{
    userName: string;
    email: string;
    password: string;
  }

  export interface ParamsEditUser{
    id: string;
    userName: string;
    email: string;
    password: string;
  }