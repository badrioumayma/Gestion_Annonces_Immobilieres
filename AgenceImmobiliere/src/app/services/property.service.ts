import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/properties`;

  constructor(private http: HttpClient) {}

  // Create a new property
  addProperty(property: Partial<Property>): Observable<Property> {
    console.log('Sending request to:', this.apiUrl);
    console.log('Property data:', property);
    
    return this.http.post<Property>(this.apiUrl, property, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => console.log('Response from server:', response)),
      catchError(error => {
        console.error('Error in addProperty:', error);
        return throwError(() => error);
      })
    );
  }

  // Get all properties with optional filters
  getAllProperties(filters?: Partial<Property>): Observable<Property[]> {
    let params = new HttpParams();
    
    /*if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof Property];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }*/

    return this.http.get<Property[]>(this.apiUrl, { params });
  }

  // Get a single property by ID
  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update a property
  updateProperty(id: number, property: Partial<Property>, imageFile?: File): Observable<Property> {
    if (imageFile) {
      const formData = new FormData();
      formData.append('property', new Blob([JSON.stringify(property)], { type: 'application/json' }));
      formData.append('file', imageFile);
      return this.http.put<Property>(`${this.apiUrl}/${id}`, formData);
    } else {
      return this.http.put<Property>(`${this.apiUrl}/${id}`, property, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
  }

  // Delete a property
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get properties by type (vente/location)
  getPropertiesByType(type: 'HOUSE' | 'APARTMENT'): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}`, {
      params: new HttpParams().set('type', type)
    });
  }

  // Search properties with multiple criteria
  searchProperties(filters: Partial<Property>): Observable<Property[]> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof Property];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<Property[]>(`${this.apiUrl}/search`, { params });
  }

  // Upload property images
  uploadPropertyImages(propertyId: number, images: File[]): Observable<string[]> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image, `property_${propertyId}_${index}`);
    });
    
    return this.http.post<string[]>(`${this.apiUrl}/${propertyId}/images`, formData);
  }

  // Delete property image
  deletePropertyImage(propertyId: number, imageUrl: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${propertyId}/images`, {
      params: new HttpParams().set('imageUrl', imageUrl)
    });
  }

  // Get properties statistics
  getPropertiesStats(): Observable<{
    total: number;
    available: number;
    sold: number;
    rented: number;
    averagePrice: number;
  }> {
    return this.getAllProperties().pipe(
      map(properties => {
        const stats = {
          total: properties.length,
          available: properties.filter(p => p.statut === 'DISPONIBLE').length,
          sold: properties.filter(p => p.statut === 'VENDU').length,
          rented: properties.filter(p => p.statut === 'LOUE').length,
          averagePrice: properties.reduce((acc, curr) => acc + curr.prix, 0) / properties.length || 0
        };
        return stats;
      })
    );
  }

  // Create a new property with image (multipart)
  addPropertyWithImage(property: Partial<Property>, imageFile?: File): Observable<Property> {
    if (imageFile) {
      const formData = new FormData();
      formData.append('property', new Blob([JSON.stringify(property)], { type: 'application/json' }));
      formData.append('file', imageFile);
      return this.http.post<Property>(`${this.apiUrl}/with-image`, formData);
    } else {
      // If no image, send as JSON
      return this.http.post<Property>(this.apiUrl, property, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Erreur lors de la communication avec le serveur'));
  }
}
