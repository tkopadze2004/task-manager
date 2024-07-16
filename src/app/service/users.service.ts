import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { UserPayload, UserResponse } from '../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  getUsers(): Observable<UserResponse> {
    return this.get<UserResponse>('users');
  }

  deleteUser(UserId: number) {
    return this.delete(`users/${UserId}`);
  }

  createUser(payload: UserPayload) {
    return this.post('users', payload);
  }
  getUser(id:number):Observable<UserPayload>{
    return this.get<UserPayload>(`users/${id}`)
  }

  editUser(id:number,payload:UserPayload){
    return this.put(`users/${id}`,payload)
  }
}
