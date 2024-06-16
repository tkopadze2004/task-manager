import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../core/interfaces/project';
import { ApiService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ApiService {
  getMyProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/my');
  }

  createProject(project: Project): Observable<Project> {
    return this.post<Project>('project', project);
  }
}
