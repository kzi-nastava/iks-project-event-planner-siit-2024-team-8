import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrl: './filter-pop-up.component.css'
})
export class FilterPopUpComponent {
  ngAfterViewInit(): void {
    // Select all filter-title elements
    const filterTitles: NodeListOf<HTMLElement> = document.querySelectorAll('.filter-title');

    filterTitles.forEach((title, index) => {
      title.addEventListener('click', () => {
        // Match the corresponding options based on index
        const options = document.querySelectorAll('.filter-options')[index] as HTMLElement;

        // Toggle the visibility of the options (including mat-slider and mat-checkbox)
        if (options) {
          options.classList.toggle('show');
        }
      });
    });
  }

  onClosePopupClick() {

  }
}
