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

  getProjectById(id: number): Observable<Project> {
    return this.get<Project>(`project/${id}`);
  }

  editProjectById(id: number, project: Project): Observable<Project> {
    return this.put<Project>(`project/${id}`, project);
  }

  deteleProjectById(id:number):Observable<Project> {
    return this.delete<Project>(`project/${id}`)
  }
}
