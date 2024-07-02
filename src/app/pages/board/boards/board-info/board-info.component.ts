import { Component, inject } from '@angular/core';
import { boardFacade } from '../../../../facade/board.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-info',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatButtonModule],
  templateUrl: './board-info.component.html',
  styleUrl: './board-info.component.scss',
})
export class BoardInfoComponent {
  boardFacade = inject(boardFacade);
  route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  router = inject(Router);

  projectId!: number;
  boardId!: number;
  board$ = this.route.params.pipe(
    switchMap((params) => {
      const projectId = Number(params['projectId']);
      const boardId = Number(params['boardId']);
      this.projectId = projectId;
      this.boardId = boardId;
      console.log(params);
      return this.boardFacade.getBoardById(projectId, boardId);
    })
  );

  delete(boardId: number, projectId: number) {
    this.boardFacade.deleteBoard(boardId, projectId).subscribe(() => {
      this.openSnackBar('Project deleted successfully!', 'Close');
      this.boardFacade.loadBoards(projectId);
      setTimeout(() => {
        this.router.navigate(['/home/mainContent/boards', this.projectId]);
      }, 3000);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
