import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../core/interfaces/role.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HeadComponent } from '../../shared/head/head.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { RoleFacade } from '../../facade/role.facade';

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
  private readonly roleFacade = inject(RoleFacade);
  public dataSource = new MatTableDataSource<Role>();
  private snackBar = inject(MatSnackBar);
  private roles!: Role[];
  private router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['name', 'createdAt', 'actions'];

  public roles$ = this.roleFacade.GetRoles().pipe(
    tap((data: Role[]) => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  delete(roleId: number) {
    this.roleFacade.deleteRole(roleId).subscribe(() => {
      this.openSnackBar(' Role deleted successfully!', 'Close');
      this.roleFacade.loadRoles();
    });
  }

  setPermissions() {
    this.router.navigate(['/home/roles/permissions']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
