  import { Injectable } from '@angular/core';
  import { Subject } from 'rxjs';

  export interface ToastOptions {
    message: string;
    title?: string;
    type: 'success' | 'error';
    duration?: number;
  }

  @Injectable({
    providedIn: 'root',
  })
  export class ToastService {
    private toastSubject = new Subject<ToastOptions>();
    toastState$ = this.toastSubject.asObservable();

    showToast(options: ToastOptions): void {
      console.log('Toast triggered:', options);
      this.toastSubject.next(options);
    }

    showSuccessToast(message: string): void {
      let options: ToastOptions = {
        message: message,
        title: 'Success',
        type: 'success',
        duration: 3000,
      };
       this.toastSubject.next(options);
      }
    showErrorToast(message: string): void {
      let options: ToastOptions = {
        message: message,
        title: 'Error',
        type: 'error',
        duration: 3000,
      }
      this.toastSubject.next(options);
    }
  }
