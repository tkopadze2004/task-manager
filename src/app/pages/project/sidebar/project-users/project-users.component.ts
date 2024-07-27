import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserComponent } from './add-user/add-user.component';
import { ProjectFacade } from '../../../../facade';
import { User } from '../../../../core/interfaces/user.interface';
import { ModalService } from '../../../../core/modal/modal.service';
import { HeadComponent } from '../../../../shared/head/head.component';

@Component({
  selector: 'app-project-users',
  standalone: true,
  imports: [
    AsyncPipe,
    HeadComponent,
    MatPaginator,
    RouterLink,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.scss',
})
export class ProjectUsersComponent implements OnDestroy {
  private readonly projectFacade = inject(ProjectFacade);
  private snackBar = inject(MatSnackBar);
  private users: User[] = [];
  private sub$=new Subject()
  private modalRef = inject(ModalService);

  public users$ = this.projectFacade.getProjectUsers().pipe(
    tap((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'actions',
  ];
  public dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get projectId() {
    return this.projectFacade.getStoredProjectId();
  }

  delete(userId: number) {
    this.projectFacade.deleteProjectUser(userId).pipe(takeUntil(this.sub$)).subscribe(() => {
      this.openSnackBar('User deleted  successfully!', 'Close');
      this.projectFacade.loadUsers();
    });
  }

  assignUser() {
    this.modalRef.open(AddUserComponent, {
      data: { user: this.users, projectId: this.projectId },
      width: 24,
      height: 300,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: false,
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
