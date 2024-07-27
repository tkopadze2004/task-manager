import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { IssueTypesComponent } from '../../issue-types/issue-types.component';
import { CreateEditIssueTypeComponent } from '../../issue-types/create-edit-issue-type/create-edit-issue-type.component';
import { EpicComponent } from '../../epic/epic.component';
import { CreateEditEpicComponent } from '../../epic/create-edit-epic/create-edit-epic.component';
import { SideBarComponent } from './sidebar.component';

export const sideBartRoutes: Routes = [
  {
    path: '',
    component: SideBarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: () => {
          return 'myProject';
        },
        pathMatch: 'full',
      },
      {
        path: 'myProject',
        component: MyProjectsComponent,
      },
      {
        path: 'boards',
        loadChildren: () =>
          import('./board/board.routes').then((m) => m.boardRoutes),
      },
      {
        path: 'issue-types',
        children: [
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
        ],
      },
      {
        path: 'epics',
        children: [
          {
            path: '',
            component: EpicComponent,
          },
          {
            path: 'add',
            component: CreateEditEpicComponent,
          },
          {
            path: 'edit/:id',
            component: CreateEditEpicComponent,
          },
        ],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./project-users/project-users.routes').then(
            (m) => m.projectUsersRoutes
          ),
      },
    ],
  },
];
