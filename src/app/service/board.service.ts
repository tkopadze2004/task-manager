import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { Board, Boardspayload } from '../core/interfaces/board';
import { TaskStatus } from '../core/enums/task-status';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends ApiService {
  public createBoard(
    boardPayload: Boardspayload
  ): Observable<Board> {
    const defaultColumns = [
      {
        name: 'To-Do',
        description: '',
        position: 0,
        taskStatus: TaskStatus.ToDo,
      },
      {
        name: 'In Progress',
        description: '',
        position: 1,
        taskStatus: TaskStatus.InProgress,
      },
      {
        name: 'Done',
        description: '',
        position: 2,
        taskStatus: TaskStatus.Done,
      },
    ];

    const payloadWithColumns = { ...boardPayload, columns: defaultColumns };

    return this.post<Board>('board', payloadWithColumns);
  }

  public getBoards(): Observable<Board[]> {
    return this.get<Board[]>('board');
  }

  public getBoardById( boardId: number): Observable<Board> {
    return this.get<Board>(`board/${boardId}`);
  }

  public deleteBoard(boardId: number): Observable<any> {
    return this.delete(`board/${boardId}`);
  }
}
