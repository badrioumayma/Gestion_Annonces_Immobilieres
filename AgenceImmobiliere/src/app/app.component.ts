import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavAndFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Liste des routes où on ne veut pas afficher le navbar et le footer
      const routesWithoutNavFooter = ['/login', '/profile', '/admin'];
      this.showNavAndFooter = !routesWithoutNavFooter.some(route => 
        event.url.startsWith(route)
      );
    });
  }
}
