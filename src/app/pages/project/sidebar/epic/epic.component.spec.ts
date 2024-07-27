import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicComponent } from './epic.component';

describe('EpicComponent', () => {
  let component: EpicComponent;
  let fixture: ComponentFixture<EpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
