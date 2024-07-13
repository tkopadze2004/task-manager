import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { storageService } from '../services';

export const projectInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const localStorageService = inject(storageService);
  const project = localStorageService.getItem('projectId');
  if (project) {
    req = req.clone({
      setHeaders: {
        project: project.toString(),
      },
    });
  }

  return next(req);
};
