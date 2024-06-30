import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ModalRef } from '../../../core/modal/modal.ref';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  modalRef = inject(ModalRef);
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  createBoard() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
  close() {
    this.modalRef.close();
  }
}
