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
  isLoading = false;
  selectedProperty: Property | null = null;
  showModal = false;

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

  deleteProperty(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      this.isLoading = true;
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.isLoading = false;
          setTimeout(() => {
            this.loadProperties();
          }, 100);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la propriété:', error);
          this.error = 'Erreur lors de la suppression de la propriété';
          this.isLoading = false;
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

  editProperty(property: Property) {
    this.selectedProperty = property;
    this.showModal = true;
  }

  onModalClosed() {
    this.showModal = false;
    this.selectedProperty = null;
    this.loadProperties();
  }
}
