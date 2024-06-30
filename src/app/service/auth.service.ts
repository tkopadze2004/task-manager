import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import {
  AuthResponse,
  Login,
  Register,
} from '../core/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class authService extends ApiService {
  register(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }
  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload);
  }

  token(refreshToken: string): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/token', { refreshToken });
  }
}
