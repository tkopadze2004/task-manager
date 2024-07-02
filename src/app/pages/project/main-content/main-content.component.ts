import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable, filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AsyncPipe, RouterLinkActive],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public projectId$: Observable<null | number> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => {
      return this.route.snapshot.firstChild?.params['projectId'];
    })
  );
}
