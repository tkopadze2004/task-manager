import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { HeadComponent } from '../../shared/head/head.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { User, UserResponse } from '../../core/interfaces/user.interface';
import { UsersService } from '../../service/users.service';
import { tap } from 'rxjs';

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
    JsonPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'actions',
  ];
  public dataSource = new MatTableDataSource<User>();
  private snackBar = inject(MatSnackBar);
  private userService = inject(UsersService);
  public users!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public users$ = this.userService.getUsers().pipe(
    tap((data: UserResponse) => {
      this.users = data.data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.users);
    })
  );

  delete(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      console.log(userId);

      this.openSnackBar(' User deleted successfully!', 'Close');
      // this.isueTypeFacade.loadIssues();
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
