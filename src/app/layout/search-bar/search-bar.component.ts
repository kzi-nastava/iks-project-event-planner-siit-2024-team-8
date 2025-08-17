import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public searchControl = new FormControl('');
}
