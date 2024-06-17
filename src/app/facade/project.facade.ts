import { Injectable, inject } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { Project } from '../core/interfaces/project';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private projectService = inject(ProjectService);

  private projectSubject = new BehaviorSubject<null>(null);
  private project$ = this.projectSubject.asObservable().pipe(
    switchMap(() => {
      return this.projectService.getMyProjects();
    }),
    shareReplay()
  );

  public loadProjects() {
    this.projectSubject.next(null);
  }

  public getMyProjects() {
    return this.project$;
  }
  
  createProject(project: Project): Observable<Project> {
    return this.projectService.createProject(project);
  }
}
