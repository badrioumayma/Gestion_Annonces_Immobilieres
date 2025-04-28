import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    total: 0,
    available: 0,
    sold: 0,
    rented: 0
  };
  
  showForm = false;
  recentProperties: Property[] = [];
  properties: Property[] = [];
  isLoading = false;
  private modal: any;
  selectedProperty: Property | null = null;

  actions = [
    {
      label: 'Modifier',
      class: 'btn btn-sm btn-warning',
      handler: (property: Property) => this.editProperty(property)
    },
    {
      label: 'Supprimer',
      class: 'btn btn-sm btn-danger',
      handler: (property: Property) => this.deleteProperty(property.id)
    }
  ];

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    this.loadStats();
    // Initialiser le modal
    const modalElement = document.getElementById('propertyModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadProperties() {
    this.isLoading = true;
    this.propertyService.getAllProperties()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.recentProperties = properties.slice(0, 5);
        },
        error: (error) => {
          console.error('Error loading properties:', error);
          // Handle error (show message, etc.)
        }
      });
  }

  loadStats() {
    this.propertyService.getPropertiesStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        // Handle error (show message, etc.)
      }
    });
  }

  onPropertyAdded(newProperty: Property) {
    // Ensure the property has a creation date
    if (!newProperty.dateCreation) {
      newProperty.dateCreation = new Date();
    }
    this.properties.unshift(newProperty);
    this.recentProperties = this.properties.slice(0, 5);
    this.loadStats();
  }

  onPropertyUpdated(updatedProperty: Property) {
    const index = this.properties.findIndex(p => p.id === updatedProperty.id);
    if (index !== -1) {
      // Preserve the original creation date
      updatedProperty.dateCreation = this.properties[index].dateCreation;
      this.properties[index] = updatedProperty;
      this.recentProperties = this.properties.slice(0, 5);
      this.loadStats();
    }
  }

  onPropertyDeleted(id: number) {
    this.isLoading = true;
    this.propertyService.deleteProperty(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== id);
          this.recentProperties = this.properties.slice(0, 5);
          this.loadStats();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  handlePropertySubmitted(property: Partial<Property>): void {
    const propertyData: Property = {
      id: 0,
      titre: property.titre || '',
      description: property.description || '',
      prix: property.prix || 0,
      type: property.type || 'MAISON',
      statut: property.statut || 'DISPONIBLE',
      surface: property.surface || 0,
      pieces: property.pieces || 0,
      chambres: property.chambres || 0,
      sallesDeBain: property.sallesDeBain || 0,
      adresse: property.adresse || '',
      ville: property.ville || '',
      pays: property.pays || '',
      localisation: property.localisation || '',
      images: [],
      dateCreation: new Date(),
      dateModification: new Date()
    };

    this.propertyService.addProperty(propertyData).subscribe({
      next: (createdProperty) => {
        this.properties.unshift(createdProperty);
        this.recentProperties = this.properties.slice(0, 5);
        this.toggleForm();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la propriété:', error);
      }
    });
  }
  

  editProperty(property: Property): void {
    this.selectedProperty = property;
    this.showForm = true;
    if (this.modal) {
      this.modal.show();
    }
  }

  deleteProperty(id: number) {
    this.isLoading = true;
    this.propertyService.deleteProperty(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.loadProperties();
          this.loadStats();
        },
        error: (error) => {
          console.error('Error deleting property:', error);
          // Handle error (show message, etc.)
        }
      });
  }

  navigateToEdit(property: any) {
    this.router.navigate(['/admin/edit-property', property.id]);
  }

  openModal() {
    this.showForm = true;
    this.selectedProperty = null;
    if (this.modal) {
      this.modal.show();
    }
  }

  closeModal() {
    this.showForm = false;
    this.selectedProperty = null;
    if (this.modal) {
      this.modal.hide();
    }
  }
}
