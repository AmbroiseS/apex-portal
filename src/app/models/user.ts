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
   email: string;
   approvedByStaff : String;
   
}
