import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEditCardComponent } from './guest-edit-card.component';

describe('GuestEditCardComponent', () => {
  let component: GuestEditCardComponent;
  let fixture: ComponentFixture<GuestEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestEditCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
