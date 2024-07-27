import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeadComponent } from '../../../../shared/head/head.component';
import { IssueType } from '../../../../core/interfaces/issue-type-interface';
import { IssueTypeFacade } from '../../../../facade/issue-type.facade';
@Component({
  selector: 'app-issue-types',
  standalone: true,
  templateUrl: './issue-types.component.html',
  styleUrl: './issue-types.component.scss',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTypesComponent {
  private isueTypeFacade = inject(IssueTypeFacade);
  private issues!: IssueType[];
  private snackBar = inject(MatSnackBar);

  public displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  public dataSource = new MatTableDataSource<IssueType>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public issueTypes$ = this.isueTypeFacade.GetIssueTypes().pipe(
    tap((data) => {
      this.issues = data;
      this.dataSource = new MatTableDataSource(this.issues);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  delete(boardId: number) {
    this.isueTypeFacade.deleteIssueType(boardId).subscribe(() => {
      this.openSnackBar('Issue Type deleted successfully!', 'Close');
      this.isueTypeFacade.loadIssues();
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
