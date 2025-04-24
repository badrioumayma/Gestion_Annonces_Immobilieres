import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'agent' | 'client';
  avatar?: string;
  favorites?: number[]; // Array of property IDs
  createdAt?: Date;
  updatedAt?: Date;
  status: 'active' | 'suspended';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Get all users (admin only)
  getAdmin(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Delete user (admin only)
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  
}
