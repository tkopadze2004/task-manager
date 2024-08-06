import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { RoleService } from '../service/role.service';
import { Role, RolePayload } from '../core/interfaces/role.interface';

@Injectable({ providedIn: 'root' })
export class RoleFacade {
  private readonly roleService = inject(RoleService);
  private roleSubject = new BehaviorSubject<number | null>(null);

  private roles$ = this.roleSubject
    .asObservable()
    .pipe(switchMap(() => this.getRoles()));

  public loadRoles() {
    this.roleSubject.next(null);
  }

  public GetRoles(): Observable<Role[]> {
    this.loadRoles();
    return this.roles$;
  }

  private getRoles(): Observable<Role[]> {
    return this.roleService.getRoles();
  }
  public getRole(id: number): Observable<RolePayload> {
    return this.roleService.getRole(id);
  }

  public deleteRole(roleId: number) {
    return this.roleService.deleteRole(roleId);
  }
  public createRole(RolePayload: RolePayload): Observable<Role> {
    return this.roleService.createRole(RolePayload);
  }

  public editRole(id: number, RolePayload: RolePayload): Observable<Role> {
    return this.roleService.editRole(id, RolePayload);
  }
}
