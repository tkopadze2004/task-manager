import { Routes } from '@angular/router';
import { ProjectUsersComponent } from './project-users.component';

export const projectUsersRoutes: Routes = [
  {
    path: '',
    component: ProjectUsersComponent,
    children: [
      {
        path: 'add',
        component: ProjectUsersComponent,
      }
    ],
  },
];
