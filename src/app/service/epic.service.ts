import { Injectable } from '@angular/core';
import { Epic, Epicpayload } from '../core/interfaces/epic';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class EpicService extends ApiService{

  getEpics(projectId: number): Observable<Epic[]> {
    return this.get<Epic[]>('epics', { project: projectId });
  }

  createEpic(
    projectId: number,
    payload: Epicpayload
  ): Observable<Epic> {
    const headersObject = { project: projectId };
    return this.post<Epic>(`epics`, payload, headersObject);
  }

  editEpic(epicId: number, projectId: number,epicpayload: Epicpayload): Observable<Epic> {

    return this.put<Epic>( `epics/${epicId}`,epicpayload,{ project: projectId }
    );
  }

  deleteEpic( epicId: number,projectId: number): Observable<Epic> {
  return this.delete<Epic>(`epics/${epicId}`,  { project: projectId })
  }
  getEpic(projectId: number, epicId: number): Observable<Epic> {
    return this.get<Epic>(`epics/${epicId}`, { project: projectId });
  }
}
