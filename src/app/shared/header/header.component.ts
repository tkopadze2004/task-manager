import { Component, inject } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade, ProjectFacade } from '../../facade';
import { ModalService } from '../../core/modal/modal.service';
import { CreateProjectComponent } from '../../pages/project/create-edit-project/create-edit-project.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CdkMenuTrigger,
    AsyncPipe,
    MatButtonModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private projectFacade = inject(ProjectFacade);
  public projects$ = this.projectFacade.getMyProjects();
  private modalService = inject(ModalService);
  public authFacade = inject(AuthFacade);
  private router = inject(Router);


  getProjectById(projectId: number): void {
    this.projectFacade.getProjectByid(projectId);
    this.router.navigate(['/home/sideBar/myProject']);
  }
  logout() {
    this.authFacade.logout();
  }
  createProject() {
    this.modalService.open(CreateProjectComponent, {
      width: 80,
      height: 660,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'projects'],
    });
  }
}
