import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IssueTypeFacade } from '../../../facade/issue-type.facade';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EpicFacade } from '../../../facade/epic.facade';
import { UsersService } from '../../../service/users.service';
import { TaskService } from '../../../service/task.service';
import { TaskStatus } from '../../../core/enums/task-status';
import { ModalRef } from '../../../core/modal/modal.ref';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatDialogModule,
    MatSelectModule,
    MatOption,
  ],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  issueservice = inject(IssueTypeFacade);
  epicfacade = inject(EpicFacade);
  userservice = inject(UsersService);
  taskService = inject(TaskService);
  private modalRef = inject(ModalRef);

  isues$ = this.issueservice.getIssueTypes();
  epics$ = this.epicfacade.getEpics();
  users$ = this.userservice.getUsersArray();

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    taskProperty: new FormControl([''], Validators.required),
    issueTypeId: new FormControl<number | null>(null, Validators.required),
    isBacklog: new FormControl<boolean>(false, Validators.required),
    priority: new FormControl('MEDIUM', Validators.required),
    epicId: new FormControl<number | null>(null, Validators.required),
    boardId: new FormControl<number | null>(null, Validators.required),
    boardColumnId: new FormControl<number | null>(null, Validators.required),
    taskStatus: new FormControl<TaskStatus>(
      TaskStatus.ToDo,
      Validators.required
    ),
    assigneeId: new FormControl<number | null>(null, Validators.required),
    reporterId: new FormControl<number | null>(null, Validators.required),
  });

  @Inject(MAT_DIALOG_DATA) public data?: {
    boardId: number;
    toDoColumnId: number;
  };

  ngOnInit(): void {
    if (this.modalRef.data?.boardId && this.modalRef.data?.toDoColumnId) {
      this.taskForm.patchValue({
        boardId: this.modalRef.data.boardId,
        boardColumnId: this.modalRef.data.toDoColumnId,
      });
      console.log(this.modalRef.data.boardId);
    }
  }
close(){
  this.modalRef.close()
}
  save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();

      return;
    }
    const payload = this.taskForm.value as unknown as {
      name: string;
      description: string;
      issueTypeId: number;
      epicId: number;
      priority:string[],
      boardId: number;
      isBacklog:boolean
      boardColumnId: number;
      taskStatus: TaskStatus.ToDo;
      taskProperty:string[]
      assigneeId: number;
      reporterId: number;
    };

    this.taskService.createTask(payload).subscribe((res) => console.log(res));
  }
}
