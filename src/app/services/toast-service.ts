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
  }
