import { Component, inject, OnDestroy } from '@angular/core';
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

import { AddTaskComponent } from '../add-task/add-task.component';
import { boardFacade } from '../../../../../../facade/board.facade';
import { TaskService } from '../../../../../../service/task.service';
import { ModalService } from '../../../../../../core/modal/modal.service';
import { Task } from '../../../../../../core/interfaces/task.interface';
import { Board, BoardColumn } from '../../../../../../core/interfaces/board';
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
  private taskService = inject(TaskService);
  private readonly modalservice = inject(ModalService);
  private boardId!: number;
  private sub$ = new Subject();
  private tasks: Task[] = [];
  public columns: { [key: number]: Task[] } = {};
  public board$!: Observable<Board>;
  public toDoColumnId!: number;

  ngOnInit() {
    const params$ = this.route.params.pipe(
      tap((params) => {
        this.boardId = Number(params['boardId']);
      })
    );

    this.board$ = params$.pipe(
      switchMap(() => this.boardFacade.getBoardById(this.boardId)),
      shareReplay(),
      tap((res) => {
        this.columns = res.columns.reduce(
          (acc: { [key: number]: Task[] }, column: BoardColumn) => {
            acc[column.id] = [];
            if (column.name === 'To-Do') {
              this.toDoColumnId = column.id;
            }
            return acc;
          },
          {}
        );
        this.getTask();
      })
    );
  }

  private getTask() {
    this.taskService
      .getTasks(this.boardId)
      .pipe(takeUntil(this.sub$))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.assignTasksToColumns();
      });
  }
  public addTask() {
    const dialogRef = this.modalservice.open(AddTaskComponent, {
      data: { boardId: this.boardId, toDoColumnId: this.toDoColumnId },
      width: 65,
      height: 705,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: false,
      panelClass: ['create-item', 'projects'],
    });

    dialogRef.afterClose$.pipe(takeUntil(this.sub$)).subscribe((result) => {
      const taskResult = result as Task | null;
      if (taskResult) {
        if (taskResult.boardColumnId !== undefined) {
          this.columns[taskResult.boardColumnId].push(taskResult);
          this.openSnackBar('Task added successfully!', 'Close');
        }
      }
    });
  }

  public deleteTask(id: number) {
    this.taskService.deleteTask(id).pipe(takeUntil(this.sub$)).subscribe(() => {
      this.removeTaskFromColumns(id);
    });
  }
  private removeTaskFromColumns(taskId: number) {
    for (const columnId in this.columns) {
      const taskIndex = this.columns[columnId].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        this.columns[columnId].splice(taskIndex, 1);
        break;
      }
    }
  }

  private assignTasksToColumns() {
    this.tasks.forEach((task) => {
      const columnId = task.boardColumnId;
      if (columnId) {
        this.columns[columnId].push(task);
      }
    });
  }

  public delete(boardId: number) {
    this.boardFacade.deleteBoard(boardId).pipe(takeUntil(this.sub$)).subscribe(() => {
      this.openSnackBar('Board deleted successfully!', 'Close');
      this.boardFacade.loadBoards();
      setTimeout(() => {
        this.router.navigate(['/home/sideBar/boards']);
      }, 3000);
    });
  }

  public drop($event: CdkDragDrop<Task[]>, column: BoardColumn) {
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

    this.taskService
      .updateTask(task.id!, task)
      .pipe(takeUntil(this.sub$))
      .subscribe();
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
