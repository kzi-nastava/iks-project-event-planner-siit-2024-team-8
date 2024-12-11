import {Component, OnInit, ViewChild} from '@angular/core';
import { ToastService, ToastOptions } from '../services/toast-service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [trigger('toastAnimation', [
    state('visible', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('hidden', style({
      opacity: 0,
      transform: 'translateX(-100%)'
    })),
    // Fade and slide in animation
    transition('hidden => visible', [
      animate('0.5s ease-out')
    ]),

    transition('visible => hidden', [
      animate('0.5s ease-in', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ])
  ]
})
export class ToastComponent implements OnInit {
  isVisible = false;
  message = '';
  title = '';
  type: 'success' | 'error' = 'success';

  @ViewChild('toastElement') toastElementRef: Element;

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService.toastState$.subscribe((options: ToastOptions) => {
      this.message = options.message;
      this.title = options.title || '';
      this.type = options.type;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, options.duration || 3000);


    });
  }

  closeToast(): void {
    this.isVisible = false;
  }

  getTitleColor() {
    return { 'color': this.type === 'success' ? '#A1C084' : 'red' };
  }
}
