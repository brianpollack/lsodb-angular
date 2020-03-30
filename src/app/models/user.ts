export  interface IUser {
    email: string,
    password: string,
}

export interface IAuthUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }