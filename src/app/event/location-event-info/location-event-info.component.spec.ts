import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEventInfoComponent } from './location-event-info.component';

describe('LocationEventInfoComponent', () => {
  let component: LocationEventInfoComponent;
  let fixture: ComponentFixture<LocationEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
