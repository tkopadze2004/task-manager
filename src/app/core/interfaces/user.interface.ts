export interface User {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}
