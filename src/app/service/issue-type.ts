import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { IssueType } from '../core/interfaces/issue-type-interface';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService extends ApiService {
  getIssueTypes(projectId: number): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type', { project: projectId });
  }
}
