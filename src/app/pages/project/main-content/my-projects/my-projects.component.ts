import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { share, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProjectFacade } from '../../../../facade';
import { Project } from '../../../../core/interfaces/project';
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
  private activatedRoute = inject(ActivatedRoute);
  private boardFacade = inject(boardFacade);

  public project$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const projectId = +params.get('projectId')!;
      return this.projectFacade.getProjectByid(projectId);
    }),
    share()
  );

  public boards$ = this.project$.pipe(
    switchMap((project: Project) => this.boardFacade.getMyBoards(project.id!))
  );
}
