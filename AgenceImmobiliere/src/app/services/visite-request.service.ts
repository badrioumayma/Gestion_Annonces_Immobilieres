import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VisiteRequest } from '../models/visite-request.model';
import { environment } from '../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisiteRequestService {
  private apiUrl = `${environment.apiUrl}/visite-requests`;

  constructor(private http: HttpClient) { }

  getAllVisiteRequests(): Observable<VisiteRequest[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(response => {
        console.log('Réponse brute API:', response);
        if (response && response.length > 0) {
          console.log('Premier élément:', response[0]);
        }
      }),
      map(response => response.map(item => ({
        id: item.id,
        propertyId: item.property?.id,
        propertyTitle: item.property?.titre || 'Titre non disponible',
        nom: item.nom,
        email: item.email,
        telephone: item.telephone,
        dateSouhaitee: item.dateSouhaitee,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt
      }))),
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => error);
      })
    );
  }

  getVisiteRequestById(id: number): Observable<VisiteRequest> {
    return this.http.get<VisiteRequest>(`${this.apiUrl}/${id}`);
  }

  createVisiteRequest(visiteRequest: VisiteRequest): Observable<VisiteRequest> {
    return this.http.post<VisiteRequest>(this.apiUrl, visiteRequest);
  }

  updateVisiteRequestStatus(id: number, status: string): Observable<VisiteRequest> {
    return this.http.put<VisiteRequest>(`${this.apiUrl}/${id}/status`, null, {
      params: { status }
    });
  }

  deleteVisiteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 