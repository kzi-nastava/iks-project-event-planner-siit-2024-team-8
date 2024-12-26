import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemCardEditComponent } from './budget-item-card-edit.component';

describe('BudgetItemCardEditComponent', () => {
  let component: BudgetItemCardEditComponent;
  let fixture: ComponentFixture<BudgetItemCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetItemCardEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetItemCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
