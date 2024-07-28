import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../core/interfaces/role.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../core/modal/modal.service';
import { RoleService } from '../../service/role.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HeadComponent } from '../../shared/head/head.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    HeadComponent,
    DatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginator,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  public dataSource = new MatTableDataSource<Role>();
  private snackBar = inject(MatSnackBar);
  public roles!: Role[];
  private modalref = inject(ModalService);
  private readonly roleService = inject(RoleService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['name', 'createdAt', 'actions'];

  public roles$ = this.roleService.getRoles().pipe(
    tap((data: Role[]) => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      console.log(this.roles);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  delete(roleId: number) {
    this.roleService.deleteRole(roleId).subscribe(() => {
      this.openSnackBar(' Role deleted successfully!', 'Close');
      // this.userFacade.loadUsers();
    });
  }

  setPermissions() {}
  // setRole(user: User) {
  //   this.modalref.open(SetRoleComponent, {
  //     data: { user: user },
  //     width: 24,
  //     height: 300,
  //     backdrob: true,
  //     backdropClass: 'dark-overlay',
  //     closeOnBackdropClick: true,
  //     panelClass: ['create-item', 'board'],
  //   });
  // }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
