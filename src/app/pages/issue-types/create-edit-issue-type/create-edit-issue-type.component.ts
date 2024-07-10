import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
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
import { IssueTypes } from '../../../core/enums/issue-type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IssueTypeFacade } from '../../../facade/issue-type.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueTypeColumn } from '../../../core/interfaces/issue-type-interface';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-create-edit-issue-type',
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
  templateUrl: './create-edit-issue-type.component.html',
  styleUrl: './create-edit-issue-type.component.scss',
})
export class CreateEditIssueTypeComponent implements OnInit, OnDestroy {
  private issueTypeFacade = inject(IssueTypeFacade);
  public issueTypes = Object.values(IssueTypes);
  private projectId!: number;
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private sub$ = new Subject();
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.sub$)).subscribe((params) => {
      if (params['projectId']) {
        this.projectId = +params['projectId'];
      }
    });
  }

  public issueTypeForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    type: new FormControl('Task', Validators.required),
    issueTypeColumns: new FormArray([]),
  });

  public get issueTypeColumns(): FormArray {
    return this.issueTypeForm.get('issueTypeColumns') as FormArray;
  }

  addIssueTypeColumn() {
    this.issueTypeColumns.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        filedName: new FormControl('', Validators.required),
        isRequired: new FormControl(true),
        // issueTypeId: new FormControl(0, Validators.required),
      })
    );
  }

  removeIssueTypeColumn(index: number) {
    this.issueTypeColumns.removeAt(index);
  }

  onSubmit() {
    if (this.issueTypeForm.invalid) {
      this.issueTypeForm.markAllAsTouched();
      return;
    }

    const {
      id,
      name,
      description,
      icon,
      color,
      isActive,
      type,
      issueTypeColumns,
    } = this.issueTypeForm.value as {
      id: number;
      name: string;
      description: string;
      icon: string;
      color: string;
      isActive: boolean;
      type: IssueTypes;
      issueTypeColumns: IssueTypeColumn[];
    };

    const payload = {
      name,
      description,
      icon,
      color,
      isActive,
      type,
      issueTypeColumns,
    };

    this.issueTypeFacade
      .createIsuueType(this.projectId, payload)

      .pipe(
        tap((res) => console.log(res, this.issueTypeForm.value)),
        catchError(({ error }) => {
          this.openSnackBar(error.message, 'Close');
          return throwError(() => error.message);
        }),
        takeUntil(this.sub$)
      )
      .subscribe(() => {
        this.openSnackBar('Issue type created successfully!', 'Close');
        this.router.navigate(['/home/mainContent/issue-types', this.projectId]);
        this.issueTypeForm.reset();
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
