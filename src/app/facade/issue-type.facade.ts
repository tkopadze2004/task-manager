import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IssueTypeService } from "../service/issue-type";
import { IssueType } from "../core/interfaces/issue-type-interface";

@Injectable({ providedIn: 'root' })
export class IssueTypeFacade {
  issueTypeService = inject(IssueTypeService);
  projectId!: number;

  getIssueTypes(projectId: number):Observable<IssueType[]> {
    return this.issueTypeService.getIssueTypes(projectId);
  }
}
