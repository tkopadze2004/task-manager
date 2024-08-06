import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
     path:'',
     component:MainComponent
  },
  {
    path: 'auth',
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
      {
        path: 'sideBar',
        loadChildren: () =>
          import('./pages/project/sidebar/sidebar-routes').then(
            (m) => m.sideBartRoutes
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.routes').then((m) => m.usersRoutes),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./pages/roles/roles.routes').then((m) => m.rolesRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
