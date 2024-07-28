import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import {
  Permission,
  Role,
  RolePayload,
} from '../core/interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ApiService {
  getRoles(): Observable<Role[]> {
    return this.get<Role[]>('role/all');
  }
  getRole(id: number): Observable<RolePayload> {
    return this.get<RolePayload>(`role/${id}`);
  }

  getPermissions(): Observable<Permission[]> {
    return this.get<Permission[]>('role/permission');
  }

  deleteRole(roleId: number) {
    return this.delete(`role/${roleId}`);
  }

  createRole(RolePayload: RolePayload): Observable<Role> {
    return this.post<Role>('role', RolePayload);
  }

  editRole(id: number, RolePayload: RolePayload): Observable<Role> {
    return this.put<Role>(`role/${id}`, RolePayload);
  }
}
