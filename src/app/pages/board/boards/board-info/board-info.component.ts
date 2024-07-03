import { Component, inject } from '@angular/core';
import { boardFacade } from '../../../../facade/board.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-board-info',
  standalone: true,
  templateUrl: './board-info.component.html',
  styleUrl: './board-info.component.scss',
  imports: [
    AsyncPipe,
    DatePipe,
    MatButtonModule,
    JsonPipe,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragPreview,
  ],
})
export class BoardInfoComponent {
  private boardFacade = inject(boardFacade);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  projectId!: number;
  boardId!: number;

  tasks = [
    { name: 'task for first' },
    { name: 'task for second' },
    { name: 'task for third' },
    { name: 'task for first' },
    { name: 'task for second' },
    { name: 'task for third' },
  ];

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
      this.openSnackBar('Board deleted successfully!', 'Close');
      this.boardFacade.loadBoards(projectId);
      setTimeout(() => {
        this.router.navigate(['/home/mainContent/boards', this.projectId]);
      }, 3000);
    });
  }

  drop($event: CdkDragDrop<any[], any, any>) {
    console.log($event.previousContainer.data.length);

    console.log($event);
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
