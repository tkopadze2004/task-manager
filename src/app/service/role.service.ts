import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { Role } from '../core/interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ApiService {
  getRoles(): Observable<Role[]> {
    return this.get<Role[]>('role/all');
  }
}
