import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  RouterLink } from '@angular/router';
import {  tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeadComponent } from '../../../../shared/head/head.component';
import { EpicFacade } from '../../../../facade/epic.facade';
import { Epic } from '../../../../core/interfaces/epic';
@Component({
  selector: 'app-epic',
  standalone: true,
  templateUrl: './epic.component.html',
  styleUrl: './epic.component.scss',
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
export class EpicComponent {
  private epicFacade = inject(EpicFacade);
  private epics!: Epic[];
  private snackBar = inject(MatSnackBar);

  public displayedColumns: string[] = ['id', 'name', 'createdAt', 'actions'];
  public dataSource = new MatTableDataSource<Epic>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public epics$ = this.epicFacade.GetEpicss().pipe(

    tap((data) => {
      this.epics = data;
      this.dataSource = new MatTableDataSource(this.epics);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  );

  delete(boardId: number) {
    this.epicFacade.deleteEpic(boardId).subscribe(() => {
      this.openSnackBar('Epic deleted successfully!', 'Close');
      this.epicFacade.GetEpicss();
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
