import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, mergeMap, throwError } from 'rxjs';
import { authService } from '../../service/auth.service';
import { AuthFacade } from '../../facade';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authfacade = inject(AuthFacade);
  const authservice = inject(authService);

  const accessToken = authfacade.accessToken;
  const refreshtoken = authfacade.refreshToken as string;

  if (!accessToken) {
    return next(req);
  }

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    })
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authservice.token(refreshtoken).pipe(
          mergeMap((res) => {
            localStorage.setItem(
              'accessToken',
              JSON.stringify(res.token.accessToken)
            );
            localStorage.setItem(
              'refreshToken',
              JSON.stringify(res.token.refreshToken)
            );
            return next(
              req.clone({
                headers: req.headers.set(
                  'Authorization',
                  `Bearer ${res.token.accessToken}`
                ),
              })
            );
          }),
          catchError((refreshError) => {
            authfacade.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
