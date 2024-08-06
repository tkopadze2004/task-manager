import { Component, inject } from '@angular/core';
import { RoleService } from '../../../service/role.service';
import { AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Permission } from '../../../core/interfaces/role.interface';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [AsyncPipe, MatCheckbox, FormsModule, AsyncPipe],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionsComponent {
  private readonly roleService = inject(RoleService);

  permissions$!: Observable<Permission[]>;

  public dataSource = new MatTableDataSource<Permission>();

  ngOnInit(): void {
    this.permissions$ = this.roleService
      .getPermissions()
      .pipe(
        map((permissions: Permission[]) =>
          permissions.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
}
