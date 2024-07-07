import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [MatButtonModule,NgIf],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss',
})
export class HeadComponent {
  title = input.required<string>();
  image = input<string>();

  button = input<string>();
  showButton = input<boolean>(true);
  showImg = input<boolean>(true);

  @Output() buttonClick = new EventEmitter<void>();
}
