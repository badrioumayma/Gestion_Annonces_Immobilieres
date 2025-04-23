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

  // Get user profile
  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Update user profile
  updateProfile(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  // Add property to favorites
  addToFavorites(userId: number, propertyId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/favorites`, { propertyId });
  }

  // Remove property from favorites
  removeFromFavorites(userId: number, propertyId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}/favorites/${propertyId}`);
  }

  // Get user's favorite properties
  getFavorites(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/${userId}/favorites`);
  }

  // Update user settings
  updateSettings(userId: number, settings: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/settings`, settings);
  }

  // Get all users (admin only)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Delete user (admin only)
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  suspendUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/suspend`, {});
  }
}
