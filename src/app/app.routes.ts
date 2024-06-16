import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
