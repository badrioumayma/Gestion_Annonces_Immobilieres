import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

declare var bootstrap: any;

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading = true;
  error = '';
  private modal: any;
  showForm = false;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
    const modalElement = document.getElementById('propertyModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadProperties(): void {
    this.loading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des propriétés';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  deleteProperty(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      const propertyId = parseInt(id, 10);
      
      if (isNaN(propertyId)) {
        console.error('ID de propriété invalide:', id);
        alert('Erreur: ID de propriété invalide');
        return;
      }
      
      this.loading = true;
      
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== propertyId);
          this.loading = false;
          alert('Propriété supprimée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.loading = false;
          alert(`Erreur lors de la suppression de la propriété: ${error.message || 'Erreur inconnue'}`);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'disponible':
        return 'badge bg-success';
      case 'réservé':
        return 'badge bg-warning';
      case 'vendue':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  openModal() {
    this.showForm = true;
    if (this.modal) {
      this.modal.show();
    }
  }

  onPropertyAdded(newProperty: Property) {
    this.properties.unshift(newProperty);
    this.loadProperties();
    if (this.modal) {
      this.modal.hide();
    }
    this.showForm = false;
  }

  onPropertyUpdated(updatedProperty: Property) {
    const index = this.properties.findIndex(p => p.id === updatedProperty.id);
    if (index !== -1) {
      this.properties[index] = updatedProperty;
    }
    this.loadProperties();
    if (this.modal) {
      this.modal.hide();
    }
    this.showForm = false;
  }
}
