import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
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
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssueTypeFacade } from '../../../../../../facade/issue-type.facade';
import { EpicFacade } from '../../../../../../facade/epic.facade';
import { UserFacade } from '../../../../../../facade';
import { TaskService } from '../../../../../../service/task.service';
import { ModalRef } from '../../../../../../core/modal/modal.ref';
import { TaskStatus } from '../../../../../../core/enums/task-status';
import { TaskPayload } from '../../../../../../core/interfaces/task.interface';


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
export class AddTaskComponent implements OnInit, OnDestroy {
  private readonly issueTypeFacade = inject(IssueTypeFacade);
  private readonly epicfacade = inject(EpicFacade);
  private readonly userFacade = inject(UserFacade);
  private readonly taskService = inject(TaskService);
  private snackBar = inject(MatSnackBar);
  private modalRef = inject(ModalRef);
  private sub$ = new Subject();
  public isues$ = this.issueTypeFacade.getIssueTypes();
  public epics$ = this.epicfacade.getEpics();
  public users$ = this.userFacade.getUsersArray();

  @Inject(MAT_DIALOG_DATA) public data?: {
    boardId: number;
    toDoColumnId: number;
  };

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
  boardId: number = this.modalRef.data.boardId;
  toDoColumnId = this.modalRef.data.toDoColumnId;

  ngOnInit(): void {
    if (this.modalRef.data?.boardId && this.modalRef.data?.toDoColumnId) {
      this.taskForm.patchValue({
        boardId: this.modalRef.data.boardId,
        boardColumnId: this.modalRef.data.toDoColumnId,
      });
    }
  }
  public close() {
    this.modalRef.close();
  }
  save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const payload = this.taskForm.value as TaskPayload as {
      name: string;
      description: string;
      issueTypeId: number;
      epicId: number;
      priority: string[];
      boardId: number;
      isBacklog: boolean;
      boardColumnId: number;
      taskStatus: TaskStatus.ToDo;
      taskProperty: string[];
      assigneeId: number;
      reporterId: number;
    };

    this.taskService
      .createTask(payload)
      .pipe(takeUntil(this.sub$))
      .subscribe((result) => {
        this.taskForm.reset();
        this.modalRef.close(result);
        this.openSnackBar('Task created successfully!', 'Close');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(null), this.sub$.complete();
  }
}
