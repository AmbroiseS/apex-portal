export type Role = 'admin' | 'manager' | 'user';

export interface GoogleUser {
   uid: string;
   role?: Role;
   email: string;
   lastSignInTime: string;
   creationTime: string;
}

export interface ApiUser {
   apexUser: ApexUser;
   googleUser: GoogleUser;

}

export interface ApexUser {
   uid: string;
   status: Status;
   displayedName?: string

}
export enum Status { PENDING, APPROVED, DENIED }


