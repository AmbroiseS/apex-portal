export type Role = 'admin' | 'manager' | 'user';

export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
}

export interface DisplayedUser {
   uid: string;
   displayName: string;
   lastSignInTime ?:string;
   creationTime ?:string;
   role ?: Role;
   email: string;
   approvedByStaff : String;
   
}


