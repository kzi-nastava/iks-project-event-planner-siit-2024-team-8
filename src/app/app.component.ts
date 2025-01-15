import {Component, SimpleChanges} from '@angular/core';
import {NavigationEnd, Route} from '@angular/router';
import {filter} from 'rxjs';
import {Router} from '@angular/router';

declare var mega: any;
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
    this.showSidebar = !(url.includes('/home') || url.includes('/fast-register') || this.isInvalidRoute(url));
  }

  isInvalidRoute(url: string):  boolean {
    const validRoutes = this.getValidRoutes();

    return !validRoutes.some(route => url.startsWith(route));
  }

  getValidRoutes(): string[] {
    const routes: string[] = [];

    this.router.config.forEach((route: Route) => {
      if (route.path) {
        const basePath = route.path.split('/')[0];
        routes.push(`/${basePath}`);
      }
    });

    return routes;
  }
}
