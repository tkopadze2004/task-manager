import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { RoleService } from '../../../service/role.service';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../core/interfaces/user.interface';
import { Role } from '../../../core/interfaces/role.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ModalRef } from '../../../core/modal/modal.ref';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../service/users.service';

@Component({
  selector: 'app-set-role',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './set-role.component.html',
  styleUrl: './set-role.component.scss',
})
export class SetRoleComponent implements OnInit, OnDestroy {
  private readonly roleService = inject(RoleService);
  private readonly usersService = inject(UsersService);
  private modalRef = inject(ModalRef);
  private sub$ = new Subject();
  private userId: number = 0;
  @Inject(MAT_DIALOG_DATA) public data?: { user: User };

  public roleForm: FormGroup = new FormGroup({
    roles: new FormControl([], Validators.required),
  });

  public roles$: Observable<Role[]> = this.roleService.getRoles()

  ngOnInit(): void {
    if (this.modalRef.data) {
      const roleNames: Role[] = [];
      this.userId = this.modalRef.data.user.id;
      this.modalRef.data.user.roles.forEach((role: { id: Role }) =>
        roleNames.push(role.id)
      );
      this.roleForm.get('roles')?.patchValue(roleNames);
    }
  }
  submit() {
    if (this.roleForm.invalid) {
      return;
    }

    this.usersService
      .setRole({
        userId: this.userId,
        roleIds: this.roleForm.controls['roles'].value,
      })
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.modalRef.close();
      });
  }
  close() {
    this.modalRef.close();
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
