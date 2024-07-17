import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import {
  User,
  UserPayload,
  UserResponse,
} from '../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  getUsers(): Observable<UserResponse> {
    return this.get<UserResponse>('users');
  }

  getUsersArray():Observable<User[]>{
    return this.get<User[]>('users/all');

  }
  deleteUser(UserId: number) {
    return this.delete(`users/${UserId}`);
  }

  createUser(payload: UserPayload) {
    return this.post('users', payload);
  }
  getUser(id: number): Observable<UserPayload> {
    return this.get<UserPayload>(`users/${id}`);
  }

  editUser(id: number, payload: UserPayload) {
    return this.put(`users/${id}`, payload);
  }

  setRole(params: { userId: number; roleIds: number[] }): Observable<User> {
    return this.post<User>('users/roles', params);
  }
}
