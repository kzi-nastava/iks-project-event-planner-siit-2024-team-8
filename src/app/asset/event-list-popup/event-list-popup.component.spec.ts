import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListPopupComponent } from './event-list-popup.component';
import {ToastService} from '../../services/toast-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {LocationDTO} from '../../event/domain/EventUpdateRequest';
import {Utility} from '../../model/utility';
import {of, throwError} from 'rxjs';
import {BudgetService} from '../../services/budget-service';

describe('EventListPopupComponent', () => {
  let component: EventListPopupComponent;
  let fixture: ComponentFixture<EventListPopupComponent>;

  let eventMockService = {getOrganizedEvents : jasmine.createSpy('getOrganizedEvents')}
  let toastServiceMock = {showSuccessToast: jasmine.createSpy('showSuccessToast'),
    showErrorToast: jasmine.createSpy('showErrorToast'),};
  let dialogRefMock = {close: jasmine.createSpy('close') };
  const email = "email@example.com";
  const utility = {id : 'u1',reservationTerm: 12};
  const dialogDataMock = {
    utility: utility,
    email: email,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListPopupComponent],
      providers: [
        { provide: EventService, useValue: eventMockService },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA,useValue: dialogDataMock },
        { provide: BudgetService, useValue: {} },
        provideNativeDateAdapter()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListPopupComponent);
    component = fixture.componentInstance;
    dialogDataMock.utility = utility;
    dialogDataMock.email = email;
    eventMockService.getOrganizedEvents.calls.reset();
    toastServiceMock.showSuccessToast.calls.reset();
    toastServiceMock.showErrorToast.calls.reset();
    dialogRefMock.close.calls.reset();
    eventMockService.getOrganizedEvents.and.returnValue(of([]));
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate null email', () => {
    component.data.email = null
    component.ngOnInit();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith("Email not provided!");
  })
  it('should invalidate null utility', () => {
    component.data.email = null
    component.ngOnInit();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith("Email not provided!");
  })

  it('should invalidate null start date', () => {
    const event : EventInfoResponse ={
      id: null,
      name: null,
      description: null,
      capacity: null,
      isPrivate: null,
      location: null,
      organizerName: null,
      organizerID: null,
      startDate: null,
      endDate: null
    }
    component.onEventClick(event);
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith("Start date is invalid!")
  })

  it('should invalidate if given event date is AFTER booking date', () => {
    const eventDays = 10 // 1–10 dana
    const reservationTermDays = 12;
    const event : EventInfoResponse ={
        id: null,
        name: null,
        description: null,
        capacity: null,
        isPrivate: null,
        location: null,
        organizerName: null,
        organizerID: null,
        startDate: new Date(Date.now() + eventDays).toISOString(),
        endDate: null
      }
      component.data.utility.reservationTerm = reservationTermDays

      component.onEventClick(event);
      expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith("Reservation term has passed for this event!")
  })

  it('should set hasEvents=false when eventService returns empty list', () => {
    eventMockService.getOrganizedEvents.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.events.length).toBe(0);
    expect(component.hasEvents).toBeFalse();
  });

  it('should set hasEvents=true when eventService returns events', () => {
    const mockEvents: EventInfoResponse[] = [{ id: '1', name: 'test', startDate: new Date().toISOString(), endDate: new Date().toISOString() } as EventInfoResponse];
    eventMockService.getOrganizedEvents.and.returnValue(of(mockEvents));
    component.ngOnInit();
    expect(component.events).toEqual(mockEvents);
    expect(component.hasEvents).toBeTrue();
  });

  it('should show error toast and set hasEvents=false when eventService fails', () => {
    eventMockService.getOrganizedEvents.and.returnValue(throwError(() => new Error('boom')));
    component.ngOnInit();
    expect(toastServiceMock.showErrorToast).toHaveBeenCalledWith("Error getting event list!");
    expect(component.hasEvents).toBeFalse();
  });
  it('should return false if reservation term has not passed yet', () => {
    const event: EventInfoResponse = {
      id: 'e1',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ahead
      endDate: null
    } as EventInfoResponse;
    component.data.utility.reservationTerm = 10;

    const result = component.isAfterBookingDate(event);

    expect(result).toBeTrue();
  })


});
