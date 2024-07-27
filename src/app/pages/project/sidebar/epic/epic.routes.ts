import { Routes } from '@angular/router';
import { EpicComponent } from './epic.component';
import { CreateEditEpicComponent } from './create-edit-epic/create-edit-epic.component';

export const epicRoutes: Routes = [
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
];
