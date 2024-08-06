import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Register } from '../../../core/interfaces/auth.interface';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthHeadComponent } from '../../../shared/auth-head/auth-head.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { NgIf } from '@angular/common';
import { AuthFacade } from '../../../facade';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.style.scss'],
  imports: [
    AuthHeadComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    AlertComponent,
    NgIf,
  ],
})
export class RegisterComponent implements OnDestroy {
  authFacade = inject(AuthFacade);
  sub$ = new Subject();
  errorMessage: string | null = null;
  successMessagge: string | null = null;
  router = inject(Router);

  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
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

    const { firstName, lastName, email, password } = this.form.value as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    firstName.trim();
    lastName.trim();
    email.trim();
    password.trim();

    const payload: Register = {
      firstName,
      lastName,
      email,
      password,
    };
    this.authFacade
      .register(payload)
      .pipe(
        catchError(({ error }) => {
          this.errorMessage = error.message;
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
          return throwError(() => error.message);
        })
      )
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        if (res) {
          this.successMessagge = 'you are registered';
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 2000);
        }
      });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
