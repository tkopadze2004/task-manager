import { Injectable, inject } from '@angular/core';
import { BoardService } from '../service/board.service';
import { Board, Boardspayload } from '../core/interfaces/board';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class boardFacade {
  private boardService = inject(BoardService);
  private boardSubject = new BehaviorSubject<number | null>(null);

  public loadBoards() {
    this.boardSubject.next(null);
  }

  public getBoards() {
    return this.boardService.getBoards();
  }
  public createBoard(Boardspayload: Boardspayload): Observable<Board> {
    return this.boardService.createBoard(Boardspayload).pipe(
      tap(() => {
        this.loadBoards();
      })
    );
  }

  public getBoardById(boardId: number): Observable<Board> {
    return this.boardService.getBoardById(boardId);
  }
  public deleteBoard(boardId: number): Observable<any> {
    return this.boardService.deleteBoard(boardId);
  }
}
