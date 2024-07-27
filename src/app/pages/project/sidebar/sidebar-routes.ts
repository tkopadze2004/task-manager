import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { MyProjectsComponent } from './my-projects/my-projects.component';
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
        path: 'issue-types',
        loadChildren: () =>
          import('./issue-types/issue-types.routes').then(
            (m) => m.issueTypesRoutes
          ),
      },
      {
        path: 'boards',
        loadChildren: () =>
          import('./board/board.routes').then((m) => m.boardRoutes),
      },

      {
        path: 'epics',
        loadChildren: () =>
          import('./epic/epic.routes').then((m) => m.epicRoutes),
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
