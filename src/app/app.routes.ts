import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path:'home',
    component:HomeComponent
  }
];
