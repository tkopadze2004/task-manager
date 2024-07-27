import { Component, Input, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardItemComponent } from '../board-item/board-item.component';
import { ModalService } from '../../core/modal/modal.service';
import { CreateProjectComponent } from '../../pages/project/create-edit-project/create-edit-project.component';
import { Project } from '../../core/interfaces/project';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ProjectFacade } from '../../facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-item',
  standalone: true,
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
  imports: [MatButtonModule, BoardItemComponent, NgStyle],
})
export class ProjectItemComponent implements OnDestroy {
  private modalService = inject(ModalService);
  private projectFacade = inject(ProjectFacade);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private sub$ = new Subject();
  @Input() project!: Project;

  public get firstLetter(): string {
    return this.project?.name ? this.project.name[0].toUpperCase() : '';
  }

  public get description(): string {
    return this.project?.description;
  }

  public get color(): string {
    return this.project?.color;
  }

  public edit() {
    this.modalService.open(CreateProjectComponent, {
      width: 80,
      height: 660,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item','projects'],
      data: { project: this.project },
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

  public delete(id: number) {
    if (id) {
      this.projectFacade
        .deleteProject(id)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.openSnackBar('Project deleted successfully!', 'Close');
          this.projectFacade.loadProjects();
          setTimeout(() => {
            this.router.navigate(['/sideBar']);
          }, 3000);
        });
    }
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
