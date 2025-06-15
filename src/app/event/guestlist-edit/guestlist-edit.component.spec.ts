import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestlistEditComponent } from './guestlist-edit.component';

describe('GuestlistEditComponent', () => {
  let component: GuestlistEditComponent;
  let fixture: ComponentFixture<GuestlistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestlistEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestlistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
