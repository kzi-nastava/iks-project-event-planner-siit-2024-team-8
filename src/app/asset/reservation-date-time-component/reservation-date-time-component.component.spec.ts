import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationDateTimeComponentComponent} from './reservation-date-time-component.component';
import {of, throwError} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from '../../services/toast-service';
import {BudgetService} from '../../services/budget-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {Utility} from '../../model/utility';

describe('ReservationDateTimeComponentComponent', () => {
  let component: ReservationDateTimeComponentComponent;
  let fixture: ComponentFixture<ReservationDateTimeComponentComponent>;
  let budgetServiceMock = {reserveUtility: jasmine.createSpy('reserveUtility')};
  let toastServiceMock = {
    showSuccessToast: jasmine.createSpy('showSuccessToast'),
    showErrorToast: jasmine.createSpy('showErrorToast')
  };
  let dialogRefMock = {close: jasmine.createSpy('close')};

  const fixedStartDate = '2025-08-15T10:00:00.000Z';
  const fixedEndDate = '2025-08-15T12:00:00.000Z';
  const utility = {id : 'u1'}
  const event = { id: 'e1', startDate: fixedStartDate, endDate: fixedEndDate, }
  const dialogDataMock = {
    utility: utility,
    event: event,
  };
  const date = new Date(Date.now());
  const time = '10:00 AM';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ReservationDateTimeComponentComponent],
      providers: [
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        provideNativeDateAdapter()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDateTimeComponentComponent);
    component = fixture.componentInstance;
    component.data = JSON.parse(JSON.stringify(dialogDataMock));
    component.selectedDate = date;
    component.selectedTime = time;
    budgetServiceMock.reserveUtility.calls.reset();
    toastServiceMock.showErrorToast.calls.reset();
    toastServiceMock.showSuccessToast.calls.reset();
    dialogRefMock.close.calls.reset();
    fixture.detectChanges();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call budgetService with correct data when date and time are selected', () => {
    component.data.event = <EventInfoResponse>event;
    component.data.utility = <Utility>utility;
    const expectedRequest = {
      date: component.selectedDate.toISOString(),
      time: '10:00 AM',
      utilityId: component.data.utility.id,
      eventId: component.data.event.id
    };

    budgetServiceMock.reserveUtility.and.returnValue(of({}));

    component.reserveUtility();

    expect(budgetServiceMock.reserveUtility).toHaveBeenCalledOnceWith(expectedRequest);
    expect(toastServiceMock.showSuccessToast).toHaveBeenCalledWith('Utility successfully reserved:');
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should invalidate empty date and time', () => {
    component.selectedDate = null;
    component.selectedTime = '';

    component.reserveUtility();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Date and time must be filled!');
    expect(budgetServiceMock.reserveUtility).not.toHaveBeenCalled();

  });

  it('should invalidate null event(not passed)', () => {
    component.data.event = null;

    component.reserveUtility();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Event not provided!');
    expect(budgetServiceMock.reserveUtility).not.toHaveBeenCalled();


  });

  it('should invalidate null utility(not passed)', () => {
    component.data.utility = null;
    component.reserveUtility();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Utility not provided!');
    expect(budgetServiceMock.reserveUtility).not.toHaveBeenCalled();
  });

  it('should show error toast when budgetService call fails', () => {
    budgetServiceMock.reserveUtility.and.returnValue(
      throwError(() => new Error('Service error'))
    );

    component.reserveUtility();

    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Error reserving utility!');
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should prioritize date/time validation before event/utility checks', () => {
    component.selectedDate = null;
    component.selectedTime = '';
    component.data.event = null;
    component.data.utility = null;

    component.reserveUtility();

    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Date and time must be filled!');
    expect(budgetServiceMock.reserveUtility).not.toHaveBeenCalled();
  });
  it('should not close dialog if validation fails', () => {
    component.selectedDate = null; // force validation fail
    component.reserveUtility();

    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should invalidate whitespace-only time string', () => {
    component.selectedDate = new Date();
    component.selectedTime = '   ';

    component.reserveUtility();

    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith('Date and time must be filled!');
    expect(budgetServiceMock.reserveUtility).not.toHaveBeenCalled();
  });


});
