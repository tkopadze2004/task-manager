import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content.component';
import { authGuard } from '../../../core/guards/auth.guard';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { BoardsComponent } from '../../board/boards/boards.component';
import { BoardInfoComponent } from '../../board/boards/board-info/board-info.component';
import { IssueTypesComponent } from '../../issue-types/issue-types.component';
import { CreateEditIssueTypeComponent } from '../../issue-types/create-edit-issue-type/create-edit-issue-type.component';
import { EpicComponent } from '../../epic/epic.component';
import { CreateEditEpicComponent } from '../../epic/create-edit-epic/create-edit-epic.component';
import { ProjectUsersComponent } from '../../project-users/project-users.component';

export const mainContentRoutes: Routes = [
  {
    path: '',
    component: MainContentComponent,
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
        children: [
          {
            path: '',
            component: BoardsComponent,
          },
          {
            path: 'board/:boardId',
            component: BoardInfoComponent,
          },
        ],
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
        children: [
          {
            path: '',
            component: ProjectUsersComponent,
          },
          {
            path: 'add',
            component: ProjectUsersComponent,
          },
          {
            path: 'edit/:id',
            component: ProjectUsersComponent,
          },
        ],
      },
    ]
  },
];
