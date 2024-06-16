import { Component, OnDestroy, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { AuthHeadComponent } from '../../../shared/auth-head/auth-head.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { Login } from '../../../core/interfaces/auth.interface';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthFacade } from '../../../facade';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.style.scss'],
  imports: [
    AuthHeadComponent,

    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    AlertComponent,
  ],
})
export class LoginComponent implements OnDestroy {
  authFacade = inject(AuthFacade);
  router = inject(Router);
  sub$ = new Subject();
  errorMessage: string | null = null;
  successMessagge: string | null = null;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[\\w-]+@gmail\\.com'),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    this.successMessagge = null;

    const { email, password } = this.form.value as {
      email: string;
      password: string;
    };

    email.trim();
    password.trim();

    const payload: Login = {
      email,
      password,
    };

    this.authFacade
      .login(payload)
      .pipe(
        catchError(({ error }) => {
          this.errorMessage = error.message;
          return throwError(() => error.message);
        })
      )
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        if (res) {
          this.successMessagge = 'login successful';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        }
      });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
