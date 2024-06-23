import { Injectable, inject } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { BehaviorSubject, Observable, map, shareReplay, switchMap } from 'rxjs';
import { Project } from '../core/interfaces/project';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private projectService = inject(ProjectService);

  private projectSubject = new BehaviorSubject<null>(null);
  private projectIdSubject = new BehaviorSubject(0);

  private project$ = this.projectSubject.asObservable().pipe(
    switchMap(() => this.projectService.getMyProjects()),
    shareReplay(1)
  );

  private projectById$ = this.projectIdSubject
    .asObservable()
    .pipe(switchMap((id: number) => this.getProjectById(id)));

  public loadProjects() {
    this.projectSubject.next(null);
  }

  public getMyProjects(): Observable<Project[]> {
    return this.project$;
  }

  public loadProjectById(id: number) {
    this.projectIdSubject.next(id);
  }

  public getProjectByid(id: number): Observable<Project> {
    this.loadProjectById(id);
    return this.projectById$;
  }

  createProject(project: Project): Observable<Project> {
    return this.projectService.createProject(project);
  }

  getProjectById(id: number): Observable<Project> {
    return this.projectService.getProjectById(id).pipe(
      map(
        (project) =>
          ({
            ...project,
            id,
          } as Project)
      )
    );
  }

  editProjectById(id: number, project: Project) {
    return this.projectService.editProjectById(id, project);
  }

  deleteProject(id: number): Observable<Project> {
    return this.projectService.deteleProjectById(id);
  }
}
