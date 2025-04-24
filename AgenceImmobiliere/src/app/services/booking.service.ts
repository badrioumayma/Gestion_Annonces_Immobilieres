import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking.model';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Create a new booking
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  // Get all bookings for a user
  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get all bookings for a property
  getPropertyBookings(propertyId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  // Update booking status
  updateBookingStatus(bookingId: number, status: Booking['status']): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${bookingId}`, { status });
  }

  // Cancel booking
  cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookingId}`);
  }

  // Get available time slots for a property on a specific date
  getAvailableTimeSlots(propertyId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-slots`, {
      params: { propertyId: propertyId.toString(), date }
    });
  }

  // Get booking by ID
  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${bookingId}`);
  }

  // Update booking details
  updateBooking(bookingId: number, bookingData: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${bookingId}`, bookingData);
  }
}
