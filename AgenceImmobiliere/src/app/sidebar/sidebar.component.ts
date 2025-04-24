import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    // Only close on small screens (<= 768px)
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }

  logout() {
    // Ajoutez ici la logique de déconnexion
    localStorage.removeItem('token'); // ou toute autre logique de déconnexion
    this.router.navigate(['/login']);
  }
}
