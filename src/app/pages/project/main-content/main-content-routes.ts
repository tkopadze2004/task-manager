import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content.component';
import { authGuard } from '../../../core/guards/auth.guard';
import { MyProjectsComponent } from './my-projects/my-projects.component';

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
        path: 'myProject/:projectId',
        component: MyProjectsComponent,
      },
    ],
  },
];
