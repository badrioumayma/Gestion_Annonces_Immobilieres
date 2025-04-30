import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.initForm();
  }

  private initForm() {
    this.propertyForm = this.fb.group({
      titre: ['', [Validators.required]],
      type: ['MAISON', [Validators.required]],
      prix: ['', [Validators.required]],
      description: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      pieces: ['', [Validators.required]],
      chambres: ['', [Validators.required]],
      sallesDeBain: ['', [Validators.required]],
      statut: ['DISPONIBLE', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required]]
    });

    // Marquer tous les champs comme touchés lors de la soumission
    this.propertyForm.valueChanges.subscribe(() => {
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        if (control?.invalid && control?.touched) {
          control.markAsTouched();
        }
      });
    });
  }

  private mapPropertyToForm(property: Property): any {
    return {
      titre: property.titre,
      type: property.type,
      prix: property.prix,
      description: property.description,
      localisation: property.localisation,
      surface: property.surface,
      pieces: property.pieces,
      chambres: property.chambres,
      sallesDeBain: property.sallesDeBain,
      statut: property.statut,
      adresse: property.adresse,
      ville: property.ville,
      pays: property.pays
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
    if (this.propertyForm.valid) {
      const propertyData: Partial<Property> = {
        titre: this.propertyForm.get('titre')?.value,
        description: this.propertyForm.get('description')?.value,
        prix: Number(this.propertyForm.get('prix')?.value),
        adresse: this.propertyForm.get('adresse')?.value,
        chambres: Number(this.propertyForm.get('chambres')?.value),
        sallesDeBain: Number(this.propertyForm.get('sallesDeBain')?.value),
        surface: Number(this.propertyForm.get('surface')?.value),
        pieces: Number(this.propertyForm.get('pieces')?.value),
        type: this.propertyForm.get('type')?.value,
        statut: this.propertyForm.get('statut')?.value,
        pays: this.propertyForm.get('pays')?.value,
        ville: this.propertyForm.get('ville')?.value,
        localisation: this.propertyForm.get('localisation')?.value
      };

      this.isLoading = true;

      if (this.isEditMode && this.propertyId) {
        // Mode modification
        this.propertyService.updateProperty(this.propertyId, propertyData, this.selectedImage || undefined).subscribe({
          next: (response) => {
            this.propertyUpdated.emit(response);
            this.resetForm();
            this.closeModal();
            this.isLoading = false;
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
          error: (error) => {
            console.error('Erreur lors de la modification:', error);
            this.errorMessage = "Erreur lors de la modification de la propriété.";
            this.isLoading = false;
          }
        });
      } else {
        // Mode ajout
        this.propertyService.addPropertyWithImage(propertyData, this.selectedImage || undefined).subscribe({
          next: (response) => {
            this.propertyAdded.emit(response);
            this.resetForm();
            this.closeModal();
            this.isLoading = false;
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout:', error);
            this.errorMessage = "Erreur lors de l'ajout de la propriété.";
            this.isLoading = false;
          }
        });
      }
    }
  }

 
 


  closeModal() {
    this.showModal = false;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  resetForm() {
    this.propertyForm.reset();
    this.selectedImage = null;
    this.imagePreview = null;
    this.previewImages = [];
    this.selectedImages = [];
  }

  updateProperty() {
    if (this.propertyForm.valid && this.propertyId !== null) {
      const propertyData: Partial<Property> = {
        titre: this.propertyForm.get('titre')?.value,
        description: this.propertyForm.get('description')?.value,
        prix: Number(this.propertyForm.get('prix')?.value),
        adresse: this.propertyForm.get('adresse')?.value,
        chambres: Number(this.propertyForm.get('chambres')?.value),
        sallesDeBain: Number(this.propertyForm.get('sallesDeBain')?.value),
        surface: Number(this.propertyForm.get('surface')?.value),
        pieces: Number(this.propertyForm.get('pieces')?.value),
        type: this.propertyForm.get('type')?.value,
        statut: this.propertyForm.get('statut')?.value,
        pays: this.propertyForm.get('pays')?.value,
        ville: this.propertyForm.get('ville')?.value,
        localisation: this.propertyForm.get('localisation')?.value
      };

      this.isLoading = true;
      this.propertyService.updateProperty(this.propertyId, propertyData, this.selectedImage || undefined).subscribe({
        next: (response) => {
          this.propertyUpdated.emit(response);
          this.resetForm();
          this.closeModal();
          this.isLoading = false;
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.errorMessage = "Erreur lors de la modification de la propriété.";
          this.isLoading = false;
        }
      });
    }
  }

  isFormValid(): boolean {
    return this.propertyForm.valid;
  }
}