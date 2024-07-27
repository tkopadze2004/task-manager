import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UsersService } from '../service/users.service';
import { UserResponse } from '../core/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly userService = inject(UsersService);
  private userSubject = new BehaviorSubject<number | null>(null);

  private users$ = this.userSubject
    .asObservable()
    .pipe(switchMap(() => this.getUsers()));

  public loadUsers() {
    this.userSubject.next(null);
  }

  public GetUsers(): Observable<UserResponse> {
    this.loadUsers();
    return this.users$;
  }

  private getUsers(): Observable<UserResponse> {
    return this.userService.getUsers();
  }

  public getUsersArray() {
    return this.userService.getUsersArray();
  }

  public deleteUser(UserId: number) {
    return this.userService.deleteUser(UserId);
  }
}
