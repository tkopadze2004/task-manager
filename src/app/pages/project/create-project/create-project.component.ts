import { Component, OnDestroy, inject } from '@angular/core';
import { ProjectService } from '../../../service/project.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Subject, catchError, throwError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalRef } from '../../../core/modal/modal.ref';
import { ProjectFacade } from '../../../facade';

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

  projectService = inject(ProjectService);
  projectFacade = inject(ProjectFacade);

  snackBar = inject(MatSnackBar);
  modalRef = inject(ModalRef);
  sub$ = new Subject();

  form = new FormGroup({
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

    const { name, abbreviation, description, color } = this.form.value as {
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

    this.projectService
      .createProject(payload)
      .pipe(
        catchError(({ error }) => {
          this.openSnackBar(error.message, 'Close');
          return throwError(() => error.message);
        })
      )
      .subscribe(() => {
        this.openSnackBar('Project created successfully!', 'Close');
        this.form.reset();
        this.projectFacade.loadProjects();
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 9000,
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
