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

  createIssueTypes(
    projectId: number,
    issueTypePayload: IssueType
  ): Observable<IssueType> {
    const headersObject = { project: projectId };
    return this.post<IssueType>(`issue-type`, issueTypePayload, headersObject);
  }

  editIssueType(issueTypeId: number, projectId: number,issueTypePayload: IssueType): Observable<IssueType> {

    return this.put<IssueType>( `issue-type/${issueTypeId}`,issueTypePayload,{ project: projectId }
    );
  }

  deleteIssueType( issueTypeId: number,projectId: number): Observable<IssueType> {
  return this.delete<IssueType>(`issue-type/${issueTypeId}`,  { project: projectId })
  }
  getIssueType(projectId: number, issueTypeId: number): Observable<IssueType> {
    return this.get<IssueType>(`issue-type/${issueTypeId}`, { project: projectId });
  }
}
