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
          this.recentProperties = properties.slice(0, 5); // Get latest 5, adjust as needed
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

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  handlePropertySubmitted(property: Partial<Property>): void {
    this.propertyService.addProperty(property).subscribe((createdProperty) => {
      this.properties.unshift(createdProperty);
      this.recentProperties = this.properties.slice(0, 5);
      this.toggleForm();
    });
  }
  

  editProperty(property: Property): void {
    this.router.navigate(['/admin/edit-property', property.id]);
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
    if (this.modal) {
      this.modal.show();
    }
  }
}
