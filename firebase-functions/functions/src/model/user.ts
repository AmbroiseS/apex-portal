 export type Role = 'admin' | 'manager' | 'user';

 export enum Status {PENDING, APPROVED, DENIED} 

 
export interface GoogleUser {
    uid: string;
    role?: string;
    email: string;
    photoURL? :string;
    lastSignInTime: string;
    creationTime: string;
 }
 
 export interface ApiUser {
    apexUser?: ApexUser;
    googleUser: GoogleUser;
 
 }
 
 export class ApexUser {
    uid: string = '';
    status: Status = Status.PENDING;
    displayedName?: string = '';
 
 }