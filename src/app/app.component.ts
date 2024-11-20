import {Component, SimpleChanges} from '@angular/core';
import {NavigationEnd, Route} from '@angular/router';
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
    this.setSidebarState(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setSidebarState(event.url);
    });
  }
  setSidebarState(url: string) {
    this.showSidebar = !(url === '/home' || this.isInvalidRoute(url));
  }

  isInvalidRoute(url: string):  boolean {
    const validRoutes = this.getValidRoutes();

    return !validRoutes.some(route => url.startsWith(route));
  }

  getValidRoutes(): string[] {
    const routes: string[] = [];
    this.router.config.forEach((route: Route) => {
      if (route.path) {
        routes.push(`/${route.path}`);
      }
    });
    return routes;
  }
}
