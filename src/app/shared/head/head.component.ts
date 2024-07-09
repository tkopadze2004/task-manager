import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [MatButtonModule, NgIf, RouterLink],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss',
})
export class HeadComponent {
  name = input.required<string>();
  image = input<string>();

  button = input<string>();
  showButton = input<boolean>(true);
  showImg = input<boolean>(true);
  @Input() buttonRoute: string | any[] | null | undefined;

  @Output() buttonClick = new EventEmitter<void>();
}
