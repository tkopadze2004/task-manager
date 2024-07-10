import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IssueType } from '../../core/interfaces/issue-type-interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { IssueTypeFacade } from '../../facade/issue-type.facade';
import { HeadComponent } from '../../shared/head/head.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-issue-types',
  standalone: true,
  templateUrl: './issue-types.component.html',
  styleUrl: './issue-types.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AsyncPipe,
    JsonPipe,
    TitleCasePipe,
    HeadComponent,
    DatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginator,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTypesComponent {
  private route = inject(ActivatedRoute);
  private issueTypeFacade = inject(IssueTypeFacade);
  public projectId?: number;
  private issues!: IssueType[];

  public displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  public dataSource = new MatTableDataSource<IssueType>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public issueTypes$ = this.route.params.pipe(
    switchMap((params) => {
      const projectId = Number(params['projectId']);
      this.projectId = projectId;
      return this.issueTypeFacade.getIssueTypes(projectId);
    }),
    tap((data) => {
      this.issues = data;
      this.dataSource = new MatTableDataSource(this.issues);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );
}
