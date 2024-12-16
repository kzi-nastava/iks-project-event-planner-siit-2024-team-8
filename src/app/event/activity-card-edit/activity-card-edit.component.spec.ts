import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardEditComponent } from './activity-card-edit.component';

describe('ActivityCardEditComponent', () => {
  let component: ActivityCardEditComponent;
  let fixture: ComponentFixture<ActivityCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityCardEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
