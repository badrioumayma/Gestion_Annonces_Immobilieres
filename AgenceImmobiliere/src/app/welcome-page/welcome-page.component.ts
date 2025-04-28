import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { ContactInfoComponent } from "../contact-info/contact-info.component";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  properties: Property[] = [];
  displayedProperties: Property[] = [];
  loading = false;

  // Filtres
  filters = {
    type: '',
    propertyType: '', // studio, villa, etc.
    bedrooms: '',
    minSurface: '',
    maxSurface: '',
    location: ''
  };

  // Options pour les filtres
  propertyTypes = ['Studio', 'Appartement', 'Villa', 'Maison'];
  bedroomOptions = ['1', '2', '3', '4', '5+'];
  locations = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice']; // À adapter selon vos données

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.loading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.displayedProperties = properties;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des propriétés:', error);
        this.loading = false;
      }
    });
  }

  filterByType(type: string) {
    this.displayedProperties = this.properties.filter(property => property.type === type);
  }

  filterProperties() {
    this.displayedProperties = this.properties.filter(p => 
        p.titre.toLowerCase().includes(this.filters.propertyType.toLowerCase())
    );
  }

  filterByBedrooms(bedrooms: number) {
    this.displayedProperties = this.properties.filter(p => 
        bedrooms === 5 
            ? p.chambres >= 5
            : p.chambres === bedrooms
    );
  }

  filterByLocation() {
    this.displayedProperties = this.properties.filter(p => 
        p.localisation.toLowerCase().includes(this.filters.location.toLowerCase())
    );
  }

  navigateToDetails(propertyId: number) {
    this.router.navigate(['/property', propertyId]);
  }

  applyFilters() {
    this.loading = true;
    let filteredProperties = [...this.properties];

    // Filtre par type (vente/location)
    if (this.filters.type) {
      filteredProperties = filteredProperties.filter(p => p.type === this.filters.type);
    }

    // Filtre par type de propriété
    if (this.filters.propertyType) {
      filteredProperties = filteredProperties.filter(p => 
        p.titre.toLowerCase().includes(this.filters.propertyType.toLowerCase())
      );
    }

    // Filtre par nombre de chambres
    if (this.filters.bedrooms) {
      const bedrooms = this.filters.bedrooms === '5+' 
        ? 5 
        : parseInt(this.filters.bedrooms);
      
      filteredProperties = filteredProperties.filter(p => 
        this.filters.bedrooms === '5+' 
          ? p.chambres >= 5 
          : p.chambres === bedrooms
      );
    }

    // Filtre par surface
    if (this.filters.minSurface) {
      filteredProperties = filteredProperties.filter(p => 
        p.surface >= parseInt(this.filters.minSurface)
      );
    }
    if (this.filters.maxSurface) {
      filteredProperties = filteredProperties.filter(p => 
        p.surface <= parseInt(this.filters.maxSurface)
      );
    }

    // Filtre par localisation
    if (this.filters.location) {
      filteredProperties = filteredProperties.filter(p => 
        p.localisation.toLowerCase().includes(this.filters.location.toLowerCase())
      );
    }

    setTimeout(() => {
      this.displayedProperties = filteredProperties;
      this.loading = false;
    }, 500);
  }

  resetFilters() {
    this.filters = {
      type: '',
      propertyType: '',
      bedrooms: '',
      minSurface: '',
      maxSurface: '',
      location: ''
    };
    this.displayedProperties = this.properties;
  }
}