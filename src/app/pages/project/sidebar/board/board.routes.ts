import { Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { BoardInfoComponent } from './boards/board-info/board-info.component';

export const boardRoutes: Routes = [
  {
    path: '',
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
];
