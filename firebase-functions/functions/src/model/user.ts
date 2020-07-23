export interface ApexUser {
    uid: string;
    status : Status;
    displayedName ? : string 
    
 }
 export type Role = 'admin' | 'manager' | 'user';

 export enum Status {PENDING, APPROVED, DENIED} 