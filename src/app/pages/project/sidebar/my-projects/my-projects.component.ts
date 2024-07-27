import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { share, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProjectFacade } from '../../../../facade';
import { ProjectItemComponent } from '../../../../shared/project-item/project-item.component';
import { BoardItemComponent } from '../../../../shared/board-item/board-item.component';
import { boardFacade } from '../../../../facade/board.facade';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
  imports: [AsyncPipe, ProjectItemComponent, BoardItemComponent, RouterLink],
})
export class MyProjectsComponent {
  private projectFacade = inject(ProjectFacade);
  private boardFacade = inject(boardFacade);

  public project$ = this.projectFacade.projectById$.pipe(share());

  public boards$ = this.project$.pipe(
    switchMap(() => this.boardFacade.getBoards())
  );
}
