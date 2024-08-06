import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRoleComponent } from './create-edit-role.component';

describe('CreateEditRoleComponent', () => {
  let component: CreateEditRoleComponent;
  let fixture: ComponentFixture<CreateEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
