import { Component, inject, OnDestroy } from '@angular/core';
import { boardFacade } from '../../../../facade/board.facade';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe, NgClass } from '@angular/common';
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
import { Task } from '../../../../core/interfaces/task.interface';
import { Board, BoardColumn } from '../../../../core/interfaces/board';
import { TaskService } from '../../../../service/task.service';
import { TaskFacade } from '../../../../facade/task.facade';
import { ModalService } from '../../../../core/modal/modal.service';
import { AddTaskComponent } from '../add-task/add-task.component';
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
    NgClass,
  ],
})
export class BoardInfoComponent implements OnDestroy {
  private boardFacade = inject(boardFacade);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private taskFacade = inject(TaskFacade);
  private readonly modalservice = inject(ModalService);
  boardId!: number;
  sub$ = new Subject();
  tasks: Task[] = [];
  columns: { [key: number]: Task[] } = {};
  board$!: Observable<Board>;
  toDoColumnId!: number;

  ngOnInit() {
    const params$ = this.route.params.pipe(
      tap((params) => {
        this.boardId = Number(params['boardId']);
      })
    );

    this.board$ = params$
      .pipe(
        switchMap(() => this.boardFacade.getBoardById(this.boardId)),
        shareReplay()
      )
      .pipe(
        tap((res) => {
          this.columns = res.columns.reduce((acc: any, column: BoardColumn) => {
            acc[column.id] = [];
            if (column.name === 'To-Do') {
              this.toDoColumnId = column.id;
            }
            return acc;
          }, {});
          this.getTask();
        })
      );
  }

  getTask() {
    this.taskFacade
      .getTasks({ boardId: this.boardId })
      .pipe(takeUntil(this.sub$))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.assignTasksToColumns();
      });
  }
  addTask() {
    this.modalservice.open(AddTaskComponent, {
      data: { boardId: this.boardId, toDoColumnId: this.toDoColumnId },
      width: 65,
      height: 705,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'projects'],
    });
    console.log(this.boardId);
    console.log(this.toDoColumnId);
  }
  deleteTask(id: number) {
    this.taskFacade.deleteTask(id).subscribe();
  }
  assignTasksToColumns() {
    this.tasks.forEach((task) => {
      const columnId = task.boardColumnId;
      if (columnId) {
        this.columns[columnId].push(task);
      }
    });
  }

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

  drop($event: CdkDragDrop<Task[]>, column: BoardColumn) {
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
    const task = $event.container.data[$event.currentIndex];
    task.boardColumnId = column.id;
    task.taskStatus = column.taskStatus;

    this.taskFacade
      .updateTask(task.id!, task)
      .pipe(takeUntil(this.sub$))
      .subscribe();
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
