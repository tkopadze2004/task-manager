import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../facade';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  if (!authFacade.isAuthenticated) {
    return router.createUrlTree(['/auth']);
  }
  return authFacade.isAuthenticated;
};
