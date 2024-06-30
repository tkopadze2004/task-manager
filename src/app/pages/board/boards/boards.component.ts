import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../../../service/board.service';
import { mergeMap, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BoardItemComponent } from '../../../shared/board-item/board-item.component';
import { ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalRef } from '../../../core/modal/modal.ref';
import { ModalService } from '../../../core/modal/modal.service';
import { CreateProjectComponent } from '../../project/create-edit-project/create-edit-project.component';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
  imports: [MatButtonModule, AsyncPipe, BoardItemComponent, MatTooltipModule],
})
export class BoardsComponent {
  private route = inject(ActivatedRoute);
  private boardService = inject(BoardService);
  private modalref = inject(ModalService);

  public boards$ = this.route.params.pipe(
    switchMap((params) => {
      const projectId = Number(params['projectId']);
      return this.boardService.getBoards(projectId);
    })
  );
  createBoard() {
    this.modalref.open(CreateBoardComponent, {
      width: 17,
      height: 370,
      backdrob: true,
      backdropClass: 'overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'board'],
    });
  }
}
