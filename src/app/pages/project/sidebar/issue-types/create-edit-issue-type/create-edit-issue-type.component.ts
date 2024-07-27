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
import { IssueTypeFacade } from '../../../../../facade/issue-type.facade';
import { IssueTypes } from '../../../../../core/enums/issue-type';
import { IssueTypeColumn } from '../../../../../core/interfaces/issue-type-interface';

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
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private sub$ = new Subject();
  private route = inject(ActivatedRoute);
  private id!: number;

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

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if ('id' in params) {
            this.id = +params['id'];
            return this.issueTypeFacade.getIssueType(this.id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.sub$)
      )
      .subscribe((issueType) => {
        if (issueType) {
          this.issueTypeForm.patchValue({
            id: issueType.id,
            name: issueType.name,
            description: issueType.description,
            icon: issueType.icon,
            color: issueType.color,
            isActive: issueType.isActive,
            type: issueType.type,
          });

          const issueTypeColumnsFormArray = this.issueTypeForm.get(
            'issueTypeColumns'
          ) as FormArray;
          issueTypeColumnsFormArray.controls = [];

          issueType.issueTypeColumns.forEach((column) => {
            issueTypeColumnsFormArray.push(
              new FormGroup({
                name: new FormControl(column.name, Validators.required),
                filedName: new FormControl(
                  column.filedName,
                  Validators.required
                ),
                isRequired: new FormControl(column.isRequired),
              })
            );
          });
        }
      });
  }

  public get issueTypeColumns(): FormArray {
    return this.issueTypeForm.get('issueTypeColumns') as FormArray;
  }

  addIssueTypeColumn() {
    this.issueTypeColumns.push(
      new FormGroup({
        id: new FormControl(null),
        name: new FormControl('', Validators.required),
        filedName: new FormControl('', Validators.required),
        isRequired: new FormControl(true),
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

    const { name, description, icon, color, isActive, type, issueTypeColumns } =
      this.issueTypeForm.value as {
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

    if (this.id) {
      this.issueTypeFacade
        .editIssueType(this.id, payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('Issue type updated successfully!', 'Close');
          this.router.navigate(['/home/sideBar/issue-types']);
          this.issueTypeForm.reset();
        });
    } else {
      this.issueTypeFacade
        .createIsuueType(payload)
        .pipe(
          catchError(({ error }) => {
            this.openSnackBar(error.message, 'Close');
            return throwError(() => error.message);
          }),
          takeUntil(this.sub$)
        )
        .subscribe(() => {
          this.openSnackBar('Issue type created successfully!', 'Close');
          this.router.navigate(['/home/sideBar/issue-types']);
          this.issueTypeForm.reset();
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
