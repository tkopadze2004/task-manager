import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BoardItemComponent } from '../../../shared/board-item/board-item.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalService } from '../../../core/modal/modal.service';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { boardFacade } from '../../../facade/board.facade';

@Component({
  selector: 'app-boards',
  standalone: true,
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
  imports: [
    MatButtonModule,
    AsyncPipe,
    BoardItemComponent,
    MatTooltipModule,
    RouterLink,
  ],
})
export class BoardsComponent {
  private route = inject(ActivatedRoute);
  private modalref = inject(ModalService);
  private boardfacade = inject(boardFacade);

  public boards$ = this.route.params.pipe(
    switchMap((params) => {
      const projectId = Number(params['projectId']);
      return this.boardfacade.getMyBoards(projectId);
    })
  );
  createBoard() {
    const projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.modalref.open(CreateBoardComponent, {
      data: { projectId },
      width: 17,
      height: 370,
      backdrob: true,
      backdropClass: 'overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'board'],
    });
  }
}
