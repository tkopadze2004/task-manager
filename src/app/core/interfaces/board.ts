import { TaskStatus } from '../enums/task-status';
import { Project } from './project';
import { Task } from './task.interface';

export interface Board {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: Project;
  columns: BoardColumn[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface BoardColumn {
  id: number;
  name: string;
  description: string;
  position: number;
  boardId: number;
  board: Board[];
  tasks: Task[];
  taskStatus: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Boardspayload {
  name: string;
  description: string;
  position?: number;
  columns?: ColumnsPayload[];
}

export interface ColumnsPayload {
  name?: string;
  description?: string;
  position?: number;
  boardId?: number;
  taskStatus?: TaskStatus;
}
