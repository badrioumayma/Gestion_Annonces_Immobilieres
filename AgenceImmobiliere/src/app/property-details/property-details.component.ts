import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | null = null;
  currentImageIndex = 0;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.propertyService.getPropertyById(id);
      })
    ).subscribe({
      next: (property) => {
        this.property = property;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la propriété:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  nextImage() {
    if (this.property?.images && this.currentImageIndex < this.property.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  getImageUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return 'https://via.placeholder.com/800x600';
  }
}
