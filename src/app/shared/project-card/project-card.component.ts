import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() name: string = '';

  color = input<string>();

  get firstLetter(): string {
    return this.name ? this.name[0].toUpperCase() : '';
  }
}
