import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-head',
  standalone: true,
  imports: [],
  templateUrl: './auth-head.component.html',
  styleUrl: './auth-head.component.scss'
})
export class AuthHeadComponent {
@Input({required:true}) title =''
}
