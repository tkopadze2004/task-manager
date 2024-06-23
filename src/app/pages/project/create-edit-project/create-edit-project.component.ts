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
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalRef } from '../../../core/modal/modal.ref';
import { ProjectFacade } from '../../../facade';
import { Project } from '../../../core/interfaces/project';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    NgStyle,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnDestroy {
  colorOptions = [
    { value: '#7B9787B8 ', viewValue: 'Green' },
    { value: '#568CB5BB', viewValue: 'Blue' },
    { value: '#7CAFC6', viewValue: 'Aqua' },
    { value: '#d7dfe3', viewValue: 'Grey' },
  ];

  projectFacade = inject(ProjectFacade);
  snackBar = inject(MatSnackBar);
  modalRef = inject(ModalRef);
  sub$ = new Subject();

  ngOnInit(): void {
    if (this.modalRef.data) {
      this.form.patchValue(this.modalRef.data.project);
    }
  }

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  createProject() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { id, name, abbreviation, description, color } = this.form.value as {
      id: number;
      name: string;
      abbreviation: string;
      description: string;
      color: string;
    };

    name.trim();
    abbreviation.trim();
    description.trim();
    color.trim();

    const payload = {
      name,
      abbreviation,
      description,
      color,
    };

    if (id) {
      this.updateProject(id, payload);
    } else {
      this.projectFacade
        .createProject(payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          })
        )
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.openSnackBar('Project created successfully!', 'Close');
          this.form.reset();
          this.projectFacade.loadProjects();
        });
    }
  }
  private updateProject(id: number, payload: Project) {
    if (!this.modalRef.data.project) {
      console.error('Project object is not available');
      return;
    } else
      this.projectFacade
        .editProjectById(id, payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          })
        )
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.openSnackBar('Project updated successfully!', 'Close');
          this.form.reset();
          this.projectFacade.loadProjectById(id);
          this.projectFacade.loadProjects();
          this.modalRef.close();
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
