import { Routes } from '@angular/router';
import { IssueTypesComponent } from './issue-types.component';
import { CreateEditIssueTypeComponent } from './create-edit-issue-type/create-edit-issue-type.component';

export const issueTypesRoutes: Routes = [
  {
    path: '',
    component: IssueTypesComponent,
  },
  {
    path: 'add',
    component: CreateEditIssueTypeComponent,
  },
  {
    path: 'edit/:id',
    component: CreateEditIssueTypeComponent,
  },
];
