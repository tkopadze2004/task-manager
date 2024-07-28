import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { Role, RolePayload } from '../core/interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ApiService {
  getRoles(): Observable<Role[]> {
    return this.get<Role[]>('role/all');
  }
  deleteRole(roleId: number) {
    return this.delete(`role/${roleId}`);
  }

  createRole(RolePayload: RolePayload): Observable<Role> {
    return this.post<Role>('role', RolePayload);
  }
}
