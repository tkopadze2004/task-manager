import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { CreateProjectComponent } from '../project/create-project/create-project.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectFacade } from '../../facade';
import { ModalService } from '../../core/modal/modal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    AsyncPipe,
    ReactiveFormsModule,
    ProjectCardComponent,
    CreateProjectComponent,
    MatButtonModule,
    RouterLink,
  ],
})
export class HomeComponent {
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
