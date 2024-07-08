import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditIssueTypeComponent } from './create-edit-issue-type.component';

describe('CreateEditIssueTypeComponent', () => {
  let component: CreateEditIssueTypeComponent;
  let fixture: ComponentFixture<CreateEditIssueTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditIssueTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditIssueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
