import { Injectable, inject } from '@angular/core';
import { ProjectService } from '../service/project.service';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Project } from '../core/interfaces/project';
import { storageService } from '../core/services';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private storageService = inject(storageService);
  private projectService = inject(ProjectService);

  private projectSubject = new BehaviorSubject<null>(null);
  private projectIdSubject = new BehaviorSubject<number | null>(
    this.getStoredProjectId()
  );
  public projectId$ = this.projectIdSubject.asObservable();

  public project$: Observable<Project[]> = this.projectSubject
    .asObservable()
    .pipe(
      switchMap(() => this.projectService.getMyProjects()),
      shareReplay(1)
    );

  public projectById$: Observable<Project> = this.projectId$.pipe(
    filter((id) => id !== null),
    switchMap((id: number | null) => this.getProjectById(id!))
  );

  private getStoredProjectId(): number | null {
    const storedId = this.storageService.getItem('projectId');
    return storedId !== null ? +storedId : null;
  }

  public loadProjects() {
    this.projectSubject.next(null);
  }

  public getMyProjects(): Observable<Project[]> {
    return this.project$;
  }

  public loadProjectById(id: number) {
    this.storageService.setItem('projectId', id);

    this.projectIdSubject.next(id);
  }

  public getProjectByid(id: number): Observable<Project> {
    this.loadProjectById(id);
    return this.projectById$;
  }

  createProject(project: Project): Observable<Project> {
    return this.projectService.createProject(project);
  }

  getProject(): Project {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;
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
