import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEventInfoComponent } from './agenda-event-info.component';

describe('AgendaEventInfoComponent', () => {
  let component: AgendaEventInfoComponent;
  let fixture: ComponentFixture<AgendaEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
