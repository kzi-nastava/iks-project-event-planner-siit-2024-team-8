import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from '../user-service';
import {UserTransferService} from '../user-transfer-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {of} from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockMatDialog = {open: jasmine.createSpy('open')};
  let mockRouter = {navigate: jasmine.createSpy('navigate')};
  let mockUserService = {registerUser: jasmine.createSpy('registerUser')};
  let mockUserTransferService = {user: null as any, formData: null as any};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule],
      providers: [
        {provide: MatDialog, useValue: mockMatDialog},
        {provide: Router, useValue: mockRouter},
        {provide: UserService, useValue: mockUserService},
        {provide: UserTransferService, useValue: mockUserTransferService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockUserService.registerUser.calls.reset();
    mockMatDialog.open.calls.reset();
    mockRouter.navigate.calls.reset();
  });

  //basic component test
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //successful registration test
  it('should register with proper data', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555555';
    component.email = 'john@example.com';
    component.password = 'secret123';
    component.repeatPassword = 'secret123';
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';

    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    mockUserService.registerUser.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockUserService.registerUser).toHaveBeenCalled();
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  //proper data being sent to backend successfully
  it('should send correct FormData to backend', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555555';
    component.email = 'john@example.com';
    component.password = 'secret123';
    component.repeatPassword = 'secret123';
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';
    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    mockUserService.registerUser.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(mockUserService.registerUser).toHaveBeenCalled();

    const formDataSent: FormData = mockUserService.registerUser.calls.mostRecent().args[0];

    expect(formDataSent.get('firstName')).toBe('John');
    expect(formDataSent.get('lastName')).toBe('Doe');
    expect(formDataSent.get('email')).toBe('john@example.com');
    expect(formDataSent.get('password')).toBe('secret123');
    expect(formDataSent.get('image')).toEqual(component.selectedFile);
  });

  //provider register
  it('should redirect to /provider-register with all the data when PROVIDER', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john@example.com';
    component.password = 'password123';
    component.repeatPassword = 'password123';
    component.profileType = 'PROVIDER';
    component.imageUrl = 'data:image/png;base64,dummy';

    component.selectedFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    component.onSubmit();

    expect(mockUserTransferService.user.firstName).toBe('John');
    expect(mockUserTransferService.formData.has('image')).toBeTrue();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/provider-register']);
  });

  //passwords mismatch fail test
  it('should fail with password mismatch', () => {
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555555';
    component.email = 'john@example.com';
    component.password = 'secret123';
    component.repeatPassword = 'falseRepeat'; //mismatch
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';

    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    //spyOn(window, 'alert');
    component.onSubmit();

    expect(mockUserService.registerUser).not.toHaveBeenCalled();
    expect(mockMatDialog.open).not.toHaveBeenCalled();
  });

  //required fields not entered test
  it('should fail with required fields missing', () => {
    component.firstName = ''; //required field
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555555';
    component.email = 'john@example.com';
    component.password = 'secret123';
    component.repeatPassword = 'secret123';
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';

    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    component.onSubmit();

    expect(mockUserService.registerUser).not.toHaveBeenCalled();
    expect(mockMatDialog.open).not.toHaveBeenCalled();
  });

  //NaN
  it('should fail with number containing other chars', () => {
    component.firstName = 'Ioannis'; //required field
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555-555';
    component.email = 'john@example.com';
    component.password = 'secret123';
    component.repeatPassword = 'secret123';
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';

    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    component.onSubmit();

    expect(mockUserService.registerUser).not.toHaveBeenCalled();
    expect(mockMatDialog.open).not.toHaveBeenCalled();
  });

  //bad email
  it('should fail with invalid email', () => {
    component.firstName = 'Ioannis'; //required field
    component.lastName = 'Doe';
    component.address = '123 Main St';
    component.number = '5555555';
    component.email = 'john@example@gary.com';
    component.password = 'secret123';
    component.repeatPassword = 'secret123';
    component.profileType = 'USER';
    component.imageUrl = 'data:image/png;base64,dummydata';

    component.selectedFile = new File(['dummy'], 'test.png', { type: 'image/png' });

    //spyOn(window, 'alert');
    component.onSubmit();

    expect(mockUserService.registerUser).not.toHaveBeenCalled();
    expect(mockMatDialog.open).not.toHaveBeenCalled();
  });

});
