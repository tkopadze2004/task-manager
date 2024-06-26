import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-board-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
})
export class BoardItemComponent {
  public name = input.required<string>();
}
