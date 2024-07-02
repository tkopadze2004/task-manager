import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content.component';
import { authGuard } from '../../../core/guards/auth.guard';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { BoardsComponent } from '../../board/boards/boards.component';
import { BoardInfoComponent } from '../../board/boards/board-info/board-info.component';

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
      {
        path: 'boards/:projectId',
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
    ],
  },
];
