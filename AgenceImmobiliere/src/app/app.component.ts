import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AgenceImmobiliere';
  isSidebarOpen = false;
  isDashboardRoute: boolean = false;

  constructor(private router: Router) {
    // S'abonner aux changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Vérifier si la route actuelle contient 'admin/dashboard'
      this.isDashboardRoute = event.url.includes('admin/dashboard');
    });
  }
}
