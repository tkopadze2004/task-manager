import { inject, Injectable } from '@angular/core';
import { Epic, Epicpayload } from '../core/interfaces/epic';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { EpicService } from '../service/epic.service';

@Injectable({ providedIn: 'root' })
export class EpicFacade {
  private EpicService = inject(EpicService);
  private epicSubject = new BehaviorSubject<number | null>(null);

  epics$ = this.epicSubject
    .asObservable()
    .pipe(switchMap(() => this.getEpics()));

  public loadEpics() {
    this.epicSubject.next(null);
  }

  public GetEpicss(): Observable<Epic[]> {
    this.loadEpics();
    return this.epics$;
  }

  getEpics(): Observable<Epic[]> {
    return this.EpicService.getEpics();
  }

  createEpic(payload: Epicpayload): Observable<Epic> {
    return this.EpicService.createEpic(payload);
  }

  editEpic(epicId: number, epicpayload: Epicpayload): Observable<Epic> {
    return this.EpicService.editEpic(epicId, epicpayload);
  }

  deleteEpic(epicId: number): Observable<Epic> {
    return this.EpicService.deleteEpic(epicId);
  }

  getEpic(epicId: number): Observable<Epic> {
    return this.EpicService.getEpic(epicId);
  }
}
