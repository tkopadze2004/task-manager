import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectFacade, UserFacade } from '../../../../../facade';
import { ModalRef } from '../../../../../core/modal/modal.ref';
import { User } from '../../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit, OnDestroy {
  private readonly userFacade = inject(UserFacade);
  private readonly projectFacade = inject(ProjectFacade);
  private modalRef = inject(ModalRef);
  private sub$ = new Subject();

  @Inject(MAT_DIALOG_DATA) public data?: { user: User[] };

  public users$: Observable<User[]> = this.userFacade.getUsersArray();

  public userForm: FormGroup = new FormGroup({
    userId: new FormControl([], Validators.required),
  });

  ngOnInit(): void {
    if (this.modalRef.data) {
      const usersArray: number[] = [];
      this.modalRef.data.user.forEach((user: { id: number }) =>
        usersArray.push(user.id)
      );
      this.userForm.get('userId')?.patchValue(usersArray);
    }
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    this.projectFacade
      .addProjectUSers({
        projectId: this.modalRef.data.projectId,
        userIds: this.userForm.controls['userId'].value,
      })
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.modalRef.close();
        this.projectFacade.loadUsers();
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
