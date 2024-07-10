import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IssueType } from '../core/interfaces/issue-type-interface';
import { IssueTypes } from '../core/enums/issue-type';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService extends ApiService {
  getIssueTypes(projectId: number): Observable<IssueType[]> {
    return this.get<IssueType[]>('issue-type', { project: projectId });
  }

  createIssueTypes(projectId: number, issueTypePayload: IssueType): Observable<IssueType> {
    const headersObject = { project: projectId };
    return this.post<IssueType>(`issue-type`, issueTypePayload, headersObject)

}
}
