import { Injectable, NgZone } from '@angular/core';
import { GoogleUser, ApiUser, Status, ApexUser } from "../../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: ApiUser; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private userService: UserService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        //  userService.
        this.getApexUser(user);
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  getApexUser(user) {
    this.userService.user$(user.uid).subscribe(apiUser => {
      console.log("here")
      console.log(apiUser)
      this.userData = apiUser;
      localStorage.setItem('user', JSON.stringify(this.userData));

    })
  }

  createApexUser(result, displayedName) {
    this.userService.createApexUser({ uid: result.user.uid, displayedName: displayedName }).subscribe(item => {
      console.log(item);
    });
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(email, password, displayedName) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
        this.createApexUser(result, displayedName);

        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.router.navigate(['home']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  userRole(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user)
      return "user"
    return user.googleUser.role;
  }

  userStatus(): Status {
    const user: ApiUser = JSON.parse(localStorage.getItem('user'));
    if (!user)
      return Status.PENDING;
    return user.apexUser.status;
  }

  getUser(): ApiUser {
    return JSON.parse(localStorage.getItem('user'));
  }


  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {

        if (result.additionalUserInfo.isNewUser) {
          this.createApexUser(result, result.user.displayName);
        }

        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    })
  }

}
