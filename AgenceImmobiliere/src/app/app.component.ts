import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavAndFooter = true;

  constructor(private router: Router) {
    // S'abonner aux événements de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Masquer navbar et footer pour les pages d'authentification
      const authPages = ['/login', '/registry'];
      this.showNavAndFooter = !authPages.includes(event.url);
    });
  }
}
