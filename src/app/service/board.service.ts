import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { Board, Boardspayload } from '../core/interfaces/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  public createBoard(
    boardPayload: Boardspayload,
    projectId: number
  ): Observable<Board> {
    const headersObject = { project: projectId };
    return this.post<Board>('board', boardPayload, headersObject);
  }

  public getBoards(projectId: number): Observable<Board[]> {
    return this.get<Board[]>('board', { project: projectId });
  }

  public getBoardById(projectId: number, boardId: number): Observable<Board> {
    return this.get<Board>(`board/${boardId}`, { project: projectId });
  }

  public deleteBoard(boardId: number, projectId: number): Observable<any> {
    const headers = { project: projectId.toString() };
    return this.delete(`board/${boardId}`, headers);
  }
}
