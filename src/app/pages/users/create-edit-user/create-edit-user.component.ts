import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersService } from '../../../service/users.service';
import {
  catchError,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardActions,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  private readonly userService = inject(UsersService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private sub$ = new Subject();
  private id!: number;
  private route = inject(ActivatedRoute);

  userForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    identityNumber: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if ('id' in params) {
            this.id = +params['id'];
            return this.userService.getUser(this.id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.sub$)
      )
      .subscribe((user) => {
        if (user) {
          this.userForm.patchValue({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            identityNumber: user.identityNumber,
            email: user.email,
            mobileNumber: user.mobileNumber,
          });
        }
      });
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const { firstName, lastName, identityNumber, email, mobileNumber } = this
      .userForm.value as {
      firstName: string;
      lastName: string;
      identityNumber: string;
      email: string;
      mobileNumber: string;
    };

    const payload = {
      firstName,
      lastName,
      identityNumber,
      email,
      mobileNumber,
    };

    if (this.id) {
      this.userService
        .editUser(this.id, payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('User updated successfully!', 'Close');
          this.router.navigate(['/home/users']);
        });
    } else {
      this.userService
        .createUser(payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('User created successfully!', 'Close');
          this.router.navigate(['/home/users']);
        });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
