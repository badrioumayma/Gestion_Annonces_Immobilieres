import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  // Credentials admin pour le développement
  private readonly ADMIN_EMAIL = 'admin@admin.com';
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor(private http: HttpClient, private router: Router) {
    // Ajouter un utilisateur admin par défaut pour le développement
    if (!localStorage.getItem('currentUser')) {
      const defaultAdmin = {
        id: 1,
        email: 'admin@admin.com',
        role: 'admin',
        token: 'fake-token'
      };
      localStorage.setItem('currentUser', JSON.stringify(defaultAdmin));
    }
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      const user = {
        id: 1,
        email: email,
        role: 'admin',
        token: 'fake-jwt-token'
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
