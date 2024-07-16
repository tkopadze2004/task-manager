import { Project } from './project';

export interface User {
  id?: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: Project[];
}

export interface UserResponse {
  data: User[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface UserPayload {
  id?: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  mobileNumber: string;
  isActive?: boolean;
}
