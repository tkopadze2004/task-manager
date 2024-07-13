import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEpicComponent } from './create-edit-epic.component';

describe('CreateEditEpicComponent', () => {
  let component: CreateEditEpicComponent;
  let fixture: ComponentFixture<CreateEditEpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditEpicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
