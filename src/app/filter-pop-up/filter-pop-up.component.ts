import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrl: './filter-pop-up.component.css'
})
export class FilterPopUpComponent {
  ngAfterViewInit(): void {
    const filterTitles: NodeListOf<HTMLElement> = document.querySelectorAll('.filter-title');


    filterTitles.forEach((title: HTMLElement) => {
      title.addEventListener('click', () => {

        const optionsId: string = 'options' + title.id.slice(-1);
        const options: HTMLElement | null = document.getElementById(optionsId);


        if (options) {
          options.classList.toggle('show');
        }
      });
    });
  }
}
