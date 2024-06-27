import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../../../service/board.service';
import { mergeMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BoardItemComponent } from '../../../shared/board-item/board-item.component';
import { ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  public boards$ = this.route.params.pipe(
    mergeMap((params) => {
      const projectId = Number(params['projectId']);
      return this.boardService.getBoards(projectId);
    })
  );
}
