import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivityCardComponent } from './new-activity-card.component';

describe('NewActivityCardComponent', () => {
  let component: NewActivityCardComponent;
  let fixture: ComponentFixture<NewActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewActivityCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
