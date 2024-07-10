import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { IssueTypeService } from '../service/issue-type';
import { IssueType } from '../core/interfaces/issue-type-interface';

@Injectable({ providedIn: 'root' })
export class IssueTypeFacade {
  issueTypeService = inject(IssueTypeService);
  private issueSubject = new BehaviorSubject<number | null>(null);

  issues$ = this.issueSubject.asObservable().pipe(
    switchMap((projectId) => this.getIssueTypes(projectId!)),
    shareReplay(1)
  );

  public loadIssues(projectId: number) {
    this.issueSubject.next(projectId);
  }

  public GetIssueTypes(projectId: number): Observable<IssueType[]> {
    this.loadIssues(projectId);
    return this.issues$;
  }

  getIssueTypes(projectId: number): Observable<IssueType[]> {
    return this.issueTypeService.getIssueTypes(projectId);
  }

  getIssueType(projectId: number, issueTypeId: number): Observable<IssueType> {
    return this.issueTypeService.getIssueType(projectId, issueTypeId);
  }

  createIsuueType(
    projectId: number,
    issueTypePayload: IssueType
  ): Observable<IssueType> {
    return this.issueTypeService.createIssueTypes(projectId, issueTypePayload);
  }

  editIssueType(
    issueTypeId: number,
    projectId: number,
    issueTypePayload: IssueType
  ): Observable<IssueType> {
    return this.issueTypeService.editIssueType(
      issueTypeId,
      projectId,
      issueTypePayload
    );
  }

  deleteIssueType(
    issueTypeId: number,
    projectId: number
  ): Observable<IssueType> {
    return this.issueTypeService.deleteIssueType(issueTypeId, projectId);
  }
}
