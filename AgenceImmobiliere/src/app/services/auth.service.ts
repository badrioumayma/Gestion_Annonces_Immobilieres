import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private user: any = null;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        this.user = JSON.parse(stored);
      } catch {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password })
      .pipe(
        tap(response => {
          this.user = response;
          localStorage.setItem('currentUser', JSON.stringify(response));
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(user => {
          this.user = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  getCurrentUser(): any {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}