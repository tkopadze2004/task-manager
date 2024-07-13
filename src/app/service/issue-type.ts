import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';
import { IssueType } from '../core/interfaces/issue-type-interface';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService extends ApiService {
  getIssueTypes(): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type');
  }

  createIssueTypes(issueTypePayload: IssueType): Observable<IssueType> {
    return this.post<IssueType>(`issue-type`, issueTypePayload);
  }

  editIssueType(
    issueTypeId: number,
    issueTypePayload: IssueType
  ): Observable<IssueType> {
    return this.put<IssueType>(`issue-type/${issueTypeId}`, issueTypePayload);
  }

  deleteIssueType(issueTypeId: number): Observable<IssueType> {
    return this.delete<IssueType>(`issue-type/${issueTypeId}`);
  }
  getIssueType(issueTypeId: number): Observable<IssueType> {
    return this.get<IssueType>(`issue-type/${issueTypeId}`);
  }
}
