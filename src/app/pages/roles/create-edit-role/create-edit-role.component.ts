import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RolePayload } from '../../../core/interfaces/role.interface';
import {
  catchError,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleFacade } from '../../../facade/role.facade';

@Component({
  selector: 'app-create-edit-role',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-edit-role.component.html',
  styleUrl: './create-edit-role.component.scss',
})
export class CreateEditRoleComponent implements OnInit, OnDestroy {
  private readonly roleFacade = inject(RoleFacade);
  private sub$ = new Subject();
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id: number = 0;

  roleForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if ('id' in params) {
            this.id = params['id'];
            return this.roleFacade.getRole(this.id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.sub$)
      )
      .subscribe((role: RolePayload | null) => {
        if (role) {
          this.roleForm.patchValue({
            id: role.id,
            name: role.name,
          });
        }
      });
  }

  onSubmit() {
    const payload = this.roleForm.value as RolePayload as { name: string };
    if (this.id) {
      this.roleFacade
        .editRole(this.id, payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('Role updated successfully!', 'Close');
          this.router.navigate(['/home/roles']);
        });
    } else {
      this.roleFacade
        .createRole(payload)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.openSnackBar(' Role created successfully!', 'Close');
          // this.router.navigate(['/home/roles/permissions']);
          this.router.navigate(['/home/roles']);

        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
