import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { map, Observable } from 'rxjs';
import { Task, TaskPayload } from '../core/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends ApiService {
  getTasks(boardId: number): Observable<Task[]> {
    return this.get<Task[]>(`task`, { boardId });
  }

  updateTask(id: number, updatedTask: Task): Observable<Task> {
    return this.put<Task>(`task/${id}`, updatedTask);
  }

  deleteTask(id: number): Observable<Task> {
    return this.delete<Task>(`task/${id}`);
  }

  createTask(taskPayload: TaskPayload): Observable<Task> {
    return this.post<Task>('task', taskPayload);
  }
}
