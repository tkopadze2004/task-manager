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
    boardPayload: Boardspayload,
    projectId: number
  ): Observable<Board> {
    const headersObject = { project: projectId };
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

    return this.post<Board>('board', payloadWithColumns, headersObject);
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
