import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HeadComponent } from '../../shared/head/head.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { User, UserResponse } from '../../core/interfaces/user.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { ModalService } from '../../core/modal/modal.service';
import { SetRoleComponent } from './set-role/set-role.component';
import { UserFacade } from '../../facade';

@Component({
  selector: 'app-users',
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
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnDestroy {
  public dataSource = new MatTableDataSource<User>();
  private snackBar = inject(MatSnackBar);
  public users!: User[];
  private sub$=new Subject()
  private modalref = inject(ModalService);
  private readonly userFacade=inject(UserFacade)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'actions',
  ];

  public users$ = this.userFacade.GetUsers().pipe(
    tap((data: UserResponse) => {
      this.users = data.data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  delete(userId: number) {
    this.userFacade.deleteUser(userId).pipe(takeUntil(this.sub$)
    ).subscribe(() => {
      this.openSnackBar(' User deleted successfully!', 'Close');
      this.userFacade.loadUsers();
    });
  }

  setRole(user: User) {
    this.modalref.open(SetRoleComponent, {
      data: { user: user },
      width: 24,
      height: 300,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'board'],
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
