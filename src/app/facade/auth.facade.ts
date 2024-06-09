import { Injectable, inject } from '@angular/core';
import { authService } from '../service/auth.service';
import {
  AuthResponse,
  Register,
} from '../core/interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { storageService } from '../core/services';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authservice = inject(authService);
  storageService = inject(storageService);

  register(payload: Register): Observable<AuthResponse> {
    return this.authservice.register(payload).pipe(
      tap((res) => {
        this.storageService.setItem('token', res.token);
        this.storageService.setItem('user', res.user);
      })
    );
  }
}
