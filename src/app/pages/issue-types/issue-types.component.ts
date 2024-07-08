import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IssueType } from '../../core/interfaces/issue-type-interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { IssueTypeFacade } from '../../facade/issue-type.facade';
import { HeadComponent } from "../../shared/head/head.component";
import { MatButtonModule } from '@angular/material/button';
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
    ]
})
export class IssueTypesComponent {
  private route = inject(ActivatedRoute);
  private issueTypeFacade = inject(IssueTypeFacade);
  projectId?:number

  displayedColumns: string[] = ['id', 'name', 'createdAt','actions'];
  dataSource = new MatTableDataSource<IssueType>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  issueTypes$ = this.route.params.pipe(
    switchMap((params) => {
      const projectId = Number(params['projectId']);
      this.projectId=projectId
      return this.issueTypeFacade.getIssueTypes(projectId);
    }),
    filter((issueTypes) => issueTypes !== null),
    tap((issueTypes) => {
      this.dataSource.data = issueTypes;
    })
  );
}
