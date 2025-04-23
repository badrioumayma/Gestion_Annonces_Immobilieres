import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface User {
  id: number;
  email: string;
  // Add other user properties as needed
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to auth state changes using the correct observable
    this.authService.currentUser.subscribe(
      (user: User | null) => {
        this.isLoggedIn = !!user;
      }
    );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
