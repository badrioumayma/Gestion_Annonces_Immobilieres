import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {
  @Input() propertyToEdit: Property | null = null;
  @Output() propertyAdded = new EventEmitter<Property>();
  @Output() propertyUpdated = new EventEmitter<Property>();
  propertyForm!: FormGroup;
  isLoading = false;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  showModal = false;
  isEditMode = false;
  propertyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  private initForm() {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['vente', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]],
      surface: ['', [Validators.required, Validators.min(0)]],
      rooms: ['', [Validators.required, Validators.min(0)]],
      bedrooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      status: ['disponible', Validators.required]
    });
  }

  private mapPropertyToForm(property: Property): any {
    return {
      title: property.title,
      type: property.type,
      price: property.price,
      description: property.description,
      location: property.location,
      surface: property.surface,
      rooms: property.rooms,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      status: property.status
    };
  }

  ngOnInit() {
    console.log('AddpropertyComponent initialized');
    
    // Check if we're in edit mode from route parameter
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      if (params['id']) {
        console.log('Edit mode detected from route param, ID:', params['id']);
        this.isEditMode = true;
        this.propertyId = +params['id'];
        this.loadProperty(this.propertyId);
      } else {
        console.log('Not in edit mode (no ID in route)');
        this.isEditMode = false;
        this.propertyId = null;
      }
    });

    // Check if we have a property to edit from input
    if (this.propertyToEdit) {
      console.log('Edit mode detected from input property');
      this.isEditMode = true;
      this.propertyId = this.propertyToEdit.id;
      this.propertyForm.patchValue(this.mapPropertyToForm(this.propertyToEdit));
      if (this.propertyToEdit.images) {
        this.previewImages = this.propertyToEdit.images;
      }
    }
  }

  private loadProperty(id: number) {
    this.isLoading = true;
    this.propertyService.getPropertyById(id).subscribe({
      next: (property) => {
        this.propertyForm.patchValue(this.mapPropertyToForm(property));
        if (property.images) {
          this.previewImages = property.images;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.isLoading = false;
        this.router.navigate(['/admin/properties']);
      }
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedImages = Array.from(files);
    this.previewImages = [];

    // Créer les aperçus pour chaque image
    this.selectedImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  onSubmit() {
    console.log('Form status:', this.propertyForm.valid);
    console.log('Form errors:', this.propertyForm.errors);
    console.log('Form values:', this.propertyForm.value);
    console.log('Is edit mode:', this.isEditMode);
    console.log('Property ID:', this.propertyId);
    
    if (this.propertyForm.valid) {
      this.isLoading = true;
      const formData = this.propertyForm.value;
      formData.images = this.previewImages;

      if (this.isEditMode && this.propertyId) {
        console.log('Updating property with ID:', this.propertyId);
        this.propertyService.updateProperty(this.propertyId, formData).subscribe({
          next: (updatedProperty) => {
            console.log('Property updated successfully:', updatedProperty);
            this.propertyUpdated.emit(updatedProperty);
            this.router.navigate(['/admin/properties']);
          },
          error: (error) => {
            console.error('Erreur lors de la modification de la propriété:', error);
            this.isLoading = false;
          }
        });
      } else {
        console.log('Adding new property');
        this.propertyService.addProperty(formData).subscribe({
          next: (newProperty) => {
            console.log('Property added successfully:', newProperty);
            this.propertyAdded.emit(newProperty);
            this.router.navigate(['/admin/properties']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la propriété:', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    if (!this.isEditMode) {
      this.propertyForm.reset();
      this.selectedImages = [];
      this.previewImages = [];
    }
  }
}
