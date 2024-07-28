import { Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role.component';

export const rolesRoutes: Routes = [
  {
    path: '',
    component: RolesComponent,
  },
  {
    path: 'add',
    component: CreateEditRoleComponent,
  },
  {
    path: 'edit/:id',
    component: CreateEditRoleComponent,
  },
];
