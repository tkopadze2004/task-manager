import { inject, Injectable } from '@angular/core';
import { Epic, Epicpayload } from '../core/interfaces/epic';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { EpicService } from '../service/epic.service';

@Injectable({ providedIn: 'root' })
export class EpicFacade {
  private EpicService = inject(EpicService);
  private epicSubject = new BehaviorSubject<number | null>(null);

  epics$ = this.epicSubject.asObservable().pipe(
    switchMap((projectId) => this.getEpics(projectId!)),
    shareReplay(1)
  );

  public loadEpics(projectId: number) {
    this.epicSubject.next(projectId);
  }

  public GetEpicss(projectId: number): Observable<Epic[]> {
    this.loadEpics(projectId);
    return this.epics$;
  }

  getEpics(projectId: number): Observable<Epic[]> {
    return this.EpicService.getEpics(projectId);
  }

  createEpic(projectId: number, payload: Epicpayload): Observable<Epic> {
    return this.EpicService.createEpic(projectId, payload);
  }

  editEpic(
    epicId: number,
    projectId: number,
    epicpayload: Epicpayload
  ): Observable<Epic> {
    return this.EpicService.editEpic(epicId, projectId, epicpayload);
  }

  deleteEpic(epicId: number, projectId: number): Observable<Epic> {
    return this.EpicService.deleteEpic(epicId, projectId);
  }

  getEpic(projectId: number, epicId: number): Observable<Epic> {
    return this.EpicService.getEpic(projectId, epicId);
  }
}
