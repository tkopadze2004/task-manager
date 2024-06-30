import { Injectable, inject } from '@angular/core';
import { authService } from '../service/auth.service';
import {
  AuthResponse,
  Login,
  Register,
} from '../core/interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { storageService } from '../core/services';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authservice = inject(authService);
  storageService = inject(storageService);
  router = inject(Router);

  get accessToken(): string {
    return this.storageService.getItem('accessToken');
  }

  get refreshToken() {
    return this.storageService.getItem('refreshToken');
  }

  get user() {
    return this.storageService.getItem('user');
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  register(payload: Register): Observable<AuthResponse> {
    return this.authservice.register(payload).pipe(
      tap((res) => {
        this.storageService.setItem('token', res.token);
        this.storageService.setItem('user', res.user);
      })
    );
  }

  login(payload: Login): Observable<AuthResponse> {
    return this.authservice.login(payload).pipe(
      tap((res) => {
        const { accessToken, refreshToken } = res.token;
        const user = res.user;
        this.storageService.setItem('accessToken', accessToken);
        this.storageService.setItem('refreshToken', refreshToken);
        this.storageService.setItem('user', user);
      })
    );
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/']);
  }
}
