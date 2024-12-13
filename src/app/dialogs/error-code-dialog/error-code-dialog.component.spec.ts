import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCodeDialogComponent } from './error-code-dialog.component';

describe('ErrorCodeDialogComponent', () => {
  let component: ErrorCodeDialogComponent;
  let fixture: ComponentFixture<ErrorCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorCodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
