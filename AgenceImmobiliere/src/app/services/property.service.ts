import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { environment } from '../../environments/environment';

export interface PropertyFilters {
  type?: 'vente' | 'location';
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  status?: 'disponible' | 'vendu' | 'loué';
}

interface SimilarPropertiesParams {
  type: string;
  priceRange: number;
  location: string;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/properties`;

  constructor(private http: HttpClient) {}

  // Create a new property
  createProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  // Get all properties with optional filters
  getAllProperties(filters?: PropertyFilters): Observable<Property[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof PropertyFilters];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<Property[]>(this.apiUrl, { params });
  }

  // Get a single property by ID
  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  // Update a property
  updateProperty(id: number, property: Partial<Property>): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  // Delete a property
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get properties by type (vente/location)
  getPropertiesByType(type: 'vente' | 'location'): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}`, {
      params: new HttpParams().set('type', type)
    });
  }

  // Get featured properties
  getFeaturedProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/featured`);
  }

  // Search properties with multiple criteria
  searchProperties(filters: PropertyFilters): Observable<Property[]> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof PropertyFilters];
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
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getSimilarProperties(propertyId: number, params: SimilarPropertiesParams): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/${propertyId}/similar`, { params: params as any });
  }
}
