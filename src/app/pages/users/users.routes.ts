import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'add',
    component: CreateEditUserComponent,
  },
  {
    path: 'edit/:id',
    component: CreateEditUserComponent,
  },
];
