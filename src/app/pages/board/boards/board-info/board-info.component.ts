import { Component, inject, OnDestroy } from '@angular/core';
import { boardFacade } from '../../../../facade/board.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
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
export class BoardInfoComponent implements OnDestroy {
  private boardFacade = inject(boardFacade);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  boardId!: number;
  sub$ = new Subject();

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
      const boardId = Number(params['boardId']);
      this.boardId = boardId;
      return this.boardFacade.getBoardById(boardId);
    })
  );

  delete(boardId: number) {
    this.boardFacade
      .deleteBoard(boardId)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.openSnackBar('Board deleted successfully!', 'Close');
        this.boardFacade.loadBoards();
        setTimeout(() => {
          this.router.navigate(['/home/mainContent/boards']);
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
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
