import { Component, inject, OnDestroy } from '@angular/core';
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
import { RoleService } from '../../../service/role.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
export class CreateEditRoleComponent implements OnDestroy {
  private readonly roleService = inject(RoleService);
  private sub$ = new Subject();
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    const payload = this.roleForm.value as RolePayload as { name: string };

    this.roleService
      .createRole(payload)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.openSnackBar(' Role created successfully!', 'Close');
        this.router.navigate(['/home/roles']);
      });
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
