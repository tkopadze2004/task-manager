import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AsyncPipe, RouterLinkActive],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  public selectedProjectId!: number;
  private route = inject(ActivatedRoute);

  public projectId$: Observable<null | number> | undefined =
    this.route.firstChild?.paramMap.pipe(
      map((params) => {
        const projectId: null | number = +params.get('projectId')!;
        return projectId;
      })
    );
}
