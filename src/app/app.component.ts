import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'task-manager-front';
  public name: string = 'tamta';
  public name2: string = 'gela';
}
