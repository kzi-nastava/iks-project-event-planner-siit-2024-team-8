import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDateTimeComponentComponent } from './reservation-date-time-component.component';

describe('ReservationDateTimeComponentComponent', () => {
  let component: ReservationDateTimeComponentComponent;
  let fixture: ComponentFixture<ReservationDateTimeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationDateTimeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDateTimeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
