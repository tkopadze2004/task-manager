import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { Board } from '../core/interfaces/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  getBoards(projectId: number): Observable<Board[]> {
    return this.get<Board[]>('board', { project: projectId });
  }
}
