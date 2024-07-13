import { Injectable } from '@angular/core';
import { Epic, Epicpayload } from '../core/interfaces/epic';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class EpicService extends ApiService {
  getEpics(): Observable<Epic[]> {
    return this.get<Epic[]>('epics');
  }

  createEpic(payload: Epicpayload): Observable<Epic> {
    return this.post<Epic>(`epics`, payload);
  }

  editEpic(epicId: number, epicpayload: Epicpayload): Observable<Epic> {
    return this.put<Epic>(`epics/${epicId}`, epicpayload);
  }

  deleteEpic(epicId: number): Observable<Epic> {
    return this.delete<Epic>(`epics/${epicId}`);
  }
  getEpic(epicId: number): Observable<Epic> {
    return this.get<Epic>(`epics/${epicId}`);
  }
}
