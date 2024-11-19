import {Component, SimpleChanges} from '@angular/core';
import {NavigationEnd} from '@angular/router';
import {filter} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BNCPlanner ';
  showSidebar: boolean = false;
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.showSidebar = event.url !== '/home';
      });
    });
  }
  ngOnChanges(changes: SimpleChanges) {}
}
