import { TaskStatus } from '../enums/task-status';
import { BoardColumn, Board } from './board';
import { Epic } from './epic';
import { IssueType } from './issue-type-interface';
import { Project } from './project';
import { User } from './user.interface';

export interface Task {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType: IssueType;
  epicId: number;
  epic: Epic;
  projectId: number;
  project: Project;
  boardId: number;
  board: Board;
  boardColumnId: number;
  boardColumn: BoardColumn;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  createdById: number;
  createdBy: User;
  deletedById: number;
  deletedBy: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export interface TaskPayload {
  name: string;
  description: string;
  issueTypeId: number;
  taskProperty: unknown;
  epicId: number;
  boardId: number;
  boardColumnId: number;
  isBacklog?: boolean;
  priority?: string[];
  taskStatus: TaskStatus;
  assigneeId: number;
  reporterId: number;
}
