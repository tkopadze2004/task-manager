import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-role',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-edit-role.component.html',
  styleUrl: './create-edit-role.component.scss',
})
export class CreateEditRoleComponent {
  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  onSubmit() {
 
  }
}
