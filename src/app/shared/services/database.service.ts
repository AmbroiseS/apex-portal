import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DisplayedUser, User } from '../../models/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  path = `/users/`;

  constructor(private db: AngularFireDatabase) {
  }

  getUsers() {
    this.db.list(this.path).valueChanges()
      .subscribe(u => {
        console.log(u); // Check the returned values;
      })
  }

  saveUser(displayed: DisplayedUser) {
    firebase.database().ref(this.path + displayed.uid).set({
      displayed
    });
  }

  getUserByUid(uid)  {
    return this.db.list(this.path + uid).valueChanges()
  }
}
