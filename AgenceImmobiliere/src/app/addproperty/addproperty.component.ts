import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {
  propertyForm: FormGroup;
  isLoading = false;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  showModal = false;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      surface: ['', [Validators.required, Validators.min(0)]],
      rooms: ['', [Validators.required, Validators.min(0)]],
      bedrooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {}

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
    if (this.propertyForm.valid) {
      this.isLoading = true;
      const formData = this.propertyForm.value;
      formData.images = this.previewImages;

      this.propertyService.addProperty(formData).subscribe({
        next: () => {
          this.closeModal();
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la propriété:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.propertyForm.reset();
    this.selectedImages = [];
    this.previewImages = [];
  }
}
