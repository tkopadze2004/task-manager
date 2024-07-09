import { Component } from '@angular/core';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { IssueTypes } from '../../../core/enums/issue-type';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
export class CreateEditIssueTypeComponent {
  public issueTypes = Object.values(IssueTypes);

  public issueTypeForm = new FormGroup({
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
    if (this.issueTypeForm.valid) {
      console.log(this.issueTypeForm.value);
    }
  }
}
