import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DisplayedUser } from '../../models/user';
import { HttpClient } from '@angular/common/http';
export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type UpdateUserRequest = { uid: string } & CreateUserRequest
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
 providedIn: 'root'
})
export class UserService {

private url = environment.api_url+"/users";

 constructor(
   private http: HttpClient
 ) { }
  get users$(): Observable<DisplayedUser[]> {
   return this.http.get<{ users: DisplayedUser[] }>(this.url).pipe(
     map(result => {
       return result.users
     })
   )
 }

 user$(id: string): Observable<DisplayedUser> {
   return this.http.get<{ user: DisplayedUser }>(`${this.url}/${id}`).pipe(
     map(result => {
       return result.user
     })
   )
 }

 create(user: CreateUserRequest) {
   return this.http.post(this.url, user)
 }

 edit(user: UpdateUserRequest) {
   return this.http.patch(`${this.url}/${user.uid}`, user)
 }

}