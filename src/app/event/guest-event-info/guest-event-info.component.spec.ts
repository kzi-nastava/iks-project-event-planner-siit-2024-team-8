import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEventInfoComponent } from './guest-event-info.component';

describe('GuestEventInfoComponent', () => {
  let component: GuestEventInfoComponent;
  let fixture: ComponentFixture<GuestEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
