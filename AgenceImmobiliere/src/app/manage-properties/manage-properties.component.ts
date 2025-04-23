import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { RouterModule } from '@angular/router';

interface PropertyStats {
  total: number;
  available: number;
  sold: number;
  rented: number;
  averagePrice: number;
}

@Component({
  selector: 'app-manage-properties',
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.css'],
})
export class ManagePropertiesComponent implements OnInit {
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  propertyForm: FormGroup;
  searchForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditing = false;
  stats: PropertyStats | null = null;
  selectedImages: File[] = [];
  imagePreviewUrls: string[] = [];
  
  // Add these missing properties referenced in your template
  showForm = false;
  propertyColumns: any[] = [
    { header: 'ID', field: 'id' },
    { header: 'Titre', field: 'title' },
    { header: 'Type', field: 'type' },
    { header: 'Prix', field: 'price' },
    { header: 'Surface', field: 'surface' },
    { header: 'Statut', field: 'status' }
  ];
  propertyActions: any[] = [
    { label: 'Modifier', icon: 'edit', action: 'edit' },
    { label: 'Supprimer', icon: 'delete', action: 'delete' }
  ];

  constructor(
    private propertyService: PropertyService,
    private fb: FormBuilder
  ) {
    this.propertyForm = this.initPropertyForm();
    this.searchForm = this.initSearchForm();
  }

  ngOnInit(): void {
    this.loadProperties();
    this.loadStats();
  }

  // Add these missing methods referenced in your template
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  closeModal(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.toggleForm();
    }
  }

  addProperty(): void {
    const propertyData = this.preparePropertyData();
    this.loading = true;
    
    this.propertyService.createProperty(propertyData).subscribe({
      next: () => {
        this.toggleForm();
        this.loadProperties();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors de l\'ajout de la propriété';
        this.loading = false;
        console.error('Error adding property:', error);
      }
    });
  }

  private initPropertyForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      type: ['vente', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      surface: ['', [Validators.required, Validators.min(0)]],
      rooms: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      garage: ['', [Validators.min(0)]],
      location: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      features: [''],
      status: ['disponible', Validators.required],
      energyClass: [''],
      energyValue: ['', [Validators.min(0)]],
      gesClass: [''],
      gesValue: ['', [Validators.min(0)]],
      agent: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      })
    });
  }

  private initSearchForm(): FormGroup {
    return this.fb.group({
      type: [''],
      minPrice: ['', [Validators.min(0)]],
      maxPrice: ['', [Validators.min(0)]],
      minSurface: ['', [Validators.min(0)]],
      maxSurface: ['', [Validators.min(0)]],
      rooms: ['', [Validators.min(0)]],
      location: [''],
      status: ['']
    });
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
        console.error('Error loading properties:', error);
      }
    });
  }

  loadStats(): void {
    this.propertyService.getPropertiesStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const propertyData = this.preparePropertyData();
      this.loading = true;
      
      if (this.isEditing && this.selectedProperty) {
        this.updateProperty(this.selectedProperty.id!, propertyData);
      } else {
        this.createProperty(propertyData);
      }
    } else {
      this.markFormGroupTouched(this.propertyForm);
    }
  }

  private preparePropertyData(): Partial<Property> {
    const formData = this.propertyForm.value;
    return {
      ...formData,
      features: typeof formData.features === 'string' 
        ? formData.features.split(',').map((f: string) => f.trim()).filter(Boolean)
        : formData.features
    };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private createProperty(propertyData: Partial<Property>): void {
    this.propertyService.createProperty(propertyData).subscribe({
      next: (property) => {
        if (this.selectedImages.length > 0) {
          this.uploadImages(property.id!);
        } else {
          this.finishPropertyCreation();
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la création de la propriété';
        this.loading = false;
        console.error('Error creating property:', error);
      }
    });
  }

  private updateProperty(id: number, propertyData: Partial<Property>): void {
    this.propertyService.updateProperty(id, propertyData).subscribe({
      next: (property) => {
        if (this.selectedImages.length > 0) {
          this.uploadImages(property.id!);
        } else {
          this.finishPropertyUpdate();
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la mise à jour de la propriété';
        this.loading = false;
        console.error('Error updating property:', error);
      }
    });
  }

  private uploadImages(propertyId: number): void {
    this.propertyService.uploadPropertyImages(propertyId, this.selectedImages).subscribe({
      next: () => {
        if (this.isEditing) {
          this.finishPropertyUpdate();
        } else {
          this.finishPropertyCreation();
        }
      },
      error: (error) => {
        this.error = 'Erreur lors du téléchargement des images';
        this.loading = false;
        console.error('Error uploading images:', error);
      }
    });
  }

  private finishPropertyCreation(): void {
    this.loading = false;
    this.resetForm();
    this.loadProperties();
    this.loadStats();
  }

  private finishPropertyUpdate(): void {
    this.loading = false;
    this.resetForm();
    this.loadProperties();
    this.loadStats();
  }

  editProperty(property: Property): void {
    this.selectedProperty = property;
    this.isEditing = true;
    
    this.propertyForm.patchValue({
      ...property,
      features: Array.isArray(property.features) 
        ? property.features.join(', ')
        : property.features
    });

    // Reset image selection
    this.selectedImages = [];
    this.imagePreviewUrls = [...(property.images || [])];
  }

  deleteProperty(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      this.loading = true;
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.loading = false;
          this.loadProperties();
          this.loadStats();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de la propriété';
          this.loading = false;
          console.error('Error deleting property:', error);
        }
      });
    }
  }

  searchProperties(): void {
    if (this.searchForm.valid) {
      const filters = this.searchForm.value;
      this.loading = true;
      
      this.propertyService.searchProperties(filters).subscribe({
        next: (properties) => {
          this.properties = properties;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de la recherche des propriétés';
          this.loading = false;
          console.error('Error searching properties:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.propertyForm = this.initPropertyForm();
    this.selectedProperty = null;
    this.isEditing = false;
    this.error = null;
    this.selectedImages = [];
    this.imagePreviewUrls = [];
  }

  resetSearch(): void {
    this.searchForm = this.initSearchForm();
    this.loadProperties();
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
      this.imagePreviewUrls = [];
      
      this.selectedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imagePreviewUrls.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    if (this.selectedProperty && this.selectedProperty.images) {
      const imageUrl = this.selectedProperty.images[index];
      this.propertyService.deletePropertyImage(this.selectedProperty.id!, imageUrl).subscribe({
        next: () => {
          this.selectedProperty!.images.splice(index, 1);
          this.imagePreviewUrls.splice(index, 1);
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression de l\'image';
          console.error('Error deleting image:', error);
        }
      });
    } else {
      this.selectedImages.splice(index, 1);
      this.imagePreviewUrls.splice(index, 1);
    }
  }

  // Getters pour la validation des formulaires
  get titleControl() { return this.propertyForm.get('title'); }
  get descriptionControl() { return this.propertyForm.get('description'); }
  get priceControl() { return this.propertyForm.get('price'); }
  get surfaceControl() { return this.propertyForm.get('surface'); }
  get roomsControl() { return this.propertyForm.get('rooms'); }
  get locationControl() { return this.propertyForm.get('location'); }
}