import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicsComponent } from './all-publics.component';

describe('AllPublicsComponent', () => {
  let component: AllPublicsComponent;
  let fixture: ComponentFixture<AllPublicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPublicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPublicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
