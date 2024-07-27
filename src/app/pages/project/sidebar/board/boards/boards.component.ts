import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { BoardItemComponent } from '../../../../../shared/board-item/board-item.component';
import { HeadComponent } from '../../../../../shared/head/head.component';
import { ModalService } from '../../../../../core/modal/modal.service';
import { boardFacade } from '../../../../../facade/board.facade';

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
    HeadComponent,
  ],
})
export class BoardsComponent {
  private modalref = inject(ModalService);
  private boardfacade = inject(boardFacade);

  boards$ = this.boardfacade.getBoards();

  createBoard() {
    this.modalref.open(CreateBoardComponent, {
      width: 17,
      height: 370,
      backdrob: true,
      backdropClass: 'dark-overlay',
      closeOnBackdropClick: true,
      panelClass: ['create-item', 'board'],
    });
  }
}
