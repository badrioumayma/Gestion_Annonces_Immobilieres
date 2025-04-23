import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | null = null;
  loading = false;
  error: string | null = null;
  activeImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.loadPropertyDetails();
  }

  private loadPropertyDetails(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Identifiant de propriété non trouvé';
      this.loading = false;
      return;
    }

    this.propertyService.getPropertyById(Number(id)).subscribe({
      next: (property) => {
        this.property = property;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement de la propriété';
        this.loading = false;
        console.error('Erreur chargement propriété :', error);
      }
    });
  }

  previousImage(): void {
    if (this.activeImageIndex > 0) {
      this.activeImageIndex--;
    }
  }

  nextImage(): void {
    if (this.property && this.activeImageIndex < this.property.images.length - 1) {
      this.activeImageIndex++;
    }
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  retryLoading(): void {
    this.error = null;
    this.loadPropertyDetails();
  }
}
