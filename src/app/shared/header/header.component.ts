import { Component, inject } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProjectFacade } from '../../facade';
import { ModalService } from '../../core/modal/modal.service';
import { CreateProjectComponent } from '../../pages/project/create-edit-project/create-edit-project.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CdkMenuTrigger, AsyncPipe, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  projectFacade = inject(ProjectFacade);
  projects$ = this.projectFacade.getMyProjects();
  modalService = inject(ModalService);

  createProject() {
    this.modalService.open(CreateProjectComponent, {
      width: 80,
      height: 660,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: 'create-project',
    });
  }
}
