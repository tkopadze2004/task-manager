import { NgClass } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'error';
}
