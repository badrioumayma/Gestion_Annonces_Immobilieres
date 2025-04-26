import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading = true;
  error = '';

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
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
      this.propertyService.deleteProperty(+id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== +id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de la propriété');
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
}
