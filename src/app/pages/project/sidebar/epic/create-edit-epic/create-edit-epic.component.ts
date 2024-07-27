import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { EpicFacade } from '../../../../../facade/epic.facade';

@Component({
  selector: 'app-create-edit-epic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-edit-epic.component.html',
  styleUrl: './create-edit-epic.component.scss',
})
export class CreateEditEpicComponent implements OnInit, OnDestroy {
  private epicFacade = inject(EpicFacade);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private sub$ = new Subject();
  private route = inject(ActivatedRoute);
  private id!: number;

  public epicForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if ('id' in params) {
            this.id = +params['id'];
            return this.epicFacade.getEpic(this.id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.sub$)
      )
      .subscribe((epic) => {
        if (epic) {
          this.epicForm.patchValue({
            id: epic.id,
            name: epic.name,
            description: epic.description,
          });
        }
      });
  }
  onSubmit() {
    if (this.epicForm.invalid) {
      this.epicForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.epicForm.value as {
      name: string;
      description: string;
    };

    const payload = {
      name,
      description,
    };

    if (this.id) {
      this.epicFacade
        .editEpic(this.id, payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('Epic updated successfully!', 'Close');
          this.router.navigate(['/home/sideBar/epics']);
          this.epicForm.reset();
        });
    } else {
      this.epicFacade
        .createEpic(payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('Epic created successfully!', 'Close');
          this.router.navigate(['/home/sideBar/epics']);
          this.epicForm.reset();
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
