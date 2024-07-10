import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IssueTypeService } from "../service/issue-type";
import { IssueType } from "../core/interfaces/issue-type-interface";
import { IssueTypes } from "../core/enums/issue-type";

@Injectable({ providedIn: 'root' })
export class IssueTypeFacade {
  issueTypeService = inject(IssueTypeService);

  getIssueTypes(projectId: number):Observable<IssueType[]> {
    return this.issueTypeService.getIssueTypes(projectId);
  }

  createIsuueType(projectId: number,issueTypePayload:IssueType):Observable<IssueType>{
    return this.issueTypeService.createIssueTypes(projectId,issueTypePayload)
  }
}
