import { Injectable, inject } from '@angular/core';
import { BoardService } from '../service/board.service';
import { Board, Boardspayload } from '../core/interfaces/board';
import { BehaviorSubject, Observable, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class boardFacade {
  private boardService = inject(BoardService);
  private boardSubject = new BehaviorSubject<number | null>(null);
  projectId!: number;

  private board$ = this.boardSubject.asObservable().pipe(
    switchMap((projectId) => this.getBoards(projectId!)),
    shareReplay(1)
  );
  public loadBoards(projectId: number) {
    this.boardSubject.next(projectId);
  }

  public getMyBoards(projectId: number): Observable<Board[]> {
    this.loadBoards(projectId);
    return this.board$;
  }

  public getBoards(projectId: number) {
    return this.boardService.getBoards(projectId);
  }
  public createBoard(
    Boardspayload: Boardspayload,
    projectId: number
  ): Observable<Board> {
    return this.boardService.createBoard(Boardspayload, projectId).pipe(
      tap(() => {
        this.loadBoards(projectId);
      })
    );
  }

  public getBoardById(projectId: number, boardId: number): Observable<Board> {
    return this.boardService.getBoardById(projectId, boardId);
  }
  public deleteBoard(boardId: number, projectId: number): Observable<any> {
    console.log(boardId, projectId);

    return this.boardService.deleteBoard(boardId, projectId);
  }
}
