import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import {
  AuthResponse,
  Login,
  Register,
  Token,
} from '../core/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class authService extends ApiService {
  register(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }
}
