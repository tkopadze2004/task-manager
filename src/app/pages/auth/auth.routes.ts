import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
