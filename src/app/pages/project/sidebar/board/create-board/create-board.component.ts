import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalRef } from '../../../../../core/modal/modal.ref';
import { boardFacade } from '../../../../../facade/board.facade';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    AsyncPipe,
    MatDialogModule,
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent implements OnDestroy {
  private boardFacade = inject(boardFacade);
  private snackBar = inject(MatSnackBar);
  private modalRef = inject(ModalRef);
  private sub$ = new Subject();
  router = inject(Router);
  boardId!: number;
  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    position: new FormControl<number>(1),
  });

  createBoard() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, position } = this.form.value as {
      name: string;
      description: string;
      position: number;
    };

    const payload = {
      name: name.trim(),
      description: description.trim(),
      position,
      columns: [],
    };

    this.boardFacade
      .createBoard(payload)
      .pipe(
        catchError(({ error }) => {
          this.openSnackBar(error.message, 'Close');
          return throwError(() => error.message);
        }),
        takeUntil(this.sub$)
      )
      .subscribe((res) => {
        this.openSnackBar('Board created successfully!', 'Close');
        this.form.reset();
        this.modalRef.close();
        const id = res.id;
        setTimeout(() => {
          this.router.navigate(['/home/sideBar/boards', 'board', id]);
        }, 1000);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
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
