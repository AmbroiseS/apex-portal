import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApiUser, Status } from '../../models/user';
import { HttpClient } from '@angular/common/http';
export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type CreateUserRequestApexUser = { uid: string, displayedName: string }
export type UpdateApexUserRequest = { uid: string, status: Status }
export type UpdateUserRequest = { uid: string } & CreateUserRequest
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api_url + "/users";
  private apex = "/apex";

  constructor(
    private http: HttpClient
  ) { }
  get users$(): Observable<ApiUser[]> {
    return this.http.get<{ users: ApiUser[] }>(this.url).pipe(
      map(result => {
        return result.users
      })
    )
  }

  updateApexUser$(user: UpdateApexUserRequest) {
    return this.http.put(this.url + this.apex, user)
  }

  user$(id: string): Observable<ApiUser> {
    return this.http.get<{ user: ApiUser }>(`${this.url}/${id}`).pipe(
      map(result => {
        return result.user
      })
    )
  }

  create(user: CreateUserRequest) {
    return this.http.post(this.url, user)
  }

  createApexUser(user: CreateUserRequestApexUser) {
    return this.http.post(this.url + '/apex', user)
  }

  edit(user: UpdateUserRequest) {
    return this.http.patch(`${this.url}/${user.uid}`, user)
  }

}