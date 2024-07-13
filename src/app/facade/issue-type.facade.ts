import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { IssueTypeService } from '../service/issue-type';
import { IssueType } from '../core/interfaces/issue-type-interface';

@Injectable({ providedIn: 'root' })
export class IssueTypeFacade {
  issueTypeService = inject(IssueTypeService);
  private issueSubject = new BehaviorSubject<number | null>(null);

  issues$ = this.issueSubject.asObservable().pipe(
    switchMap(() => this.getIssueTypes()),
  );

  public loadIssues() {
    this.issueSubject.next(null);
  }

  public GetIssueTypes(): Observable<IssueType[]> {
    this.loadIssues();
    return this.issues$;
  }

  getIssueTypes(): Observable<IssueType[]> {
    return this.issueTypeService.getIssueTypes();
  }

  getIssueType(issueTypeId: number): Observable<IssueType> {
    return this.issueTypeService.getIssueType(issueTypeId);
  }

  createIsuueType(issueTypePayload: IssueType): Observable<IssueType> {
    return this.issueTypeService.createIssueTypes(issueTypePayload);
  }

  editIssueType(
    issueTypeId: number,
    issueTypePayload: IssueType
  ): Observable<IssueType> {
    return this.issueTypeService.editIssueType(issueTypeId, issueTypePayload);
  }

  deleteIssueType(issueTypeId: number): Observable<IssueType> {
    return this.issueTypeService.deleteIssueType(issueTypeId);
  }
}
