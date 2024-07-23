import { inject, Injectable } from '@angular/core';
import { TaskService } from '../service/task.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Task, TaskPayload } from '../core/interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  taskService = inject(TaskService);
  boardId!: number;
  private taskSubject = new BehaviorSubject<number | null>(null);

  tasks$ = this.taskSubject
    .asObservable()
    .pipe(
      switchMap(() =>
        this.getTasks({ boardId: this.boardId }).pipe(
          tap(() => console.log({ boardId: this.boardId }))
        )
      )
    );

  public loadTasks(boardId: number) {
    this.taskSubject.next(boardId);
  }

  public GetTaskss(params: { boardId: number }): Observable<Task[]> {
    console.log('sds', params.boardId);
    this.loadTasks(params.boardId);
    return this.tasks$;
  }

  getTasks(params: { boardId: number }): Observable<Task[]> {
    return this.taskService.getTasks(params);
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.taskService.updateTask(id, updatedTask);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskService.deleteTask(id);
  }

  createTask(taskPayload: TaskPayload): Observable<Task> {
    return this.taskService.createTask(taskPayload);
  }
}
