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
import { User } from '../core/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private readonly storageService = inject(storageService);
  private readonly projectService = inject(ProjectService);

  private userSubject = new BehaviorSubject<null>(null);
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
  private users$ = this.userSubject
    .asObservable()
    .pipe(switchMap(() => this.projectUsers()));

  public projectById$: Observable<Project> = this.projectId$.pipe(
    filter((id) => id !== null),
    switchMap((id: number | null) => this.getProjectById(id!))
  );

  public loadUsers() {
    this.userSubject.next(null);
  }

  public loadProjects() {
    this.projectSubject.next(null);
  }

  public loadProjectById(id: number) {
    this.storageService.setItem('projectId', id);
    this.projectIdSubject.next(id);
  }

  public getProjectUsers(): Observable<User[]> {
    this.loadUsers();
    return this.users$;
  }

  public getStoredProjectId(): number | null {
    const storedId = this.storageService.getItem('projectId');
    return storedId !== null ? +storedId : null;
  }

  public getMyProjects(): Observable<Project[]> {
    return this.project$;
  }

  public getProjectByid(id: number): Observable<Project> {
    this.loadProjectById(id);
    return this.projectById$;
  }

  public addProjectUSers(params: { projectId: number; userIds: number[] }) {
    return this.projectService.addProjectUser(params);
  }
  private projectUsers() {
    return this.projectService.getProjectUsers();
  }

  public deleteProjectUser(userId: number): Observable<User> {
    return this.projectService.deleteProjectUser(userId);
  }

  public createProject(project: Project): Observable<Project> {
    return this.projectService.createProject(project);
  }

  getProject(): Project {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : null;
  }

  private getProjectById(id: number): Observable<Project> {
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

  public editProjectById(id: number, project: Project) {
    return this.projectService.editProjectById(id, project);
  }

  public deleteProject(id: number): Observable<Project> {
    return this.projectService.deteleProjectById(id);
  }
}
