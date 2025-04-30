import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare var bootstrap: any;

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1
      })),
      state('out', style({
        height: '0',
        opacity: 0
      })),
      transition('in => out', [
        animate('300ms ease-out')
      ]),
      transition('out => in', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  loading = false;
  error: string | null = null;
  private modal: any;
  showForm = false;
  isLoading = false;
  selectedProperty: Property | null = null;
  showModal = false;
  showFilters = false;

  // Types de propriétés disponibles
  propertyTypes = [
    { value: 'MAISON', label: 'Maison' },
    { value: 'APPARTEMENT', label: 'Appartement' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'TERRAIN', label: 'Terrain' },
    { value: 'COMMERCIAL', label: 'Commercial' },
    { value: 'BUREAU', label: 'Bureau' }
  ];

  // Statuts de propriétés disponibles
  propertyStatuses = [
    { value: 'DISPONIBLE', label: 'Disponible' },
    { value: 'VENDU', label: 'Vendu' },
    { value: 'LOUE', label: 'Loué' },
    { value: 'SOUS_CONTRAT', label: 'Sous Contrat' },
    { value: 'EN_ATTENTE', label: 'En Attente' }
  ];

  filterForm: FormGroup = this.fb.group({
    titre: [''],
    type: [''],
    statut: [''],
    prixMin: [''],
    prixMax: [''],
    surfaceMin: [''],
    surfaceMax: [''],
    pieces: [''],
    chambres: [''],
    sallesDeBain: [''],
    ville: [''],
    pays: [''],
    localisation: ['']
  });

  constructor(
    private propertyService: PropertyService,
    private fb: FormBuilder
  ) {
    this.initFilterForm();
  }

  private initFilterForm() {
    this.filterForm = this.fb.group({
      titre: [''],
      type: [''],
      statut: [''],
      prixMin: [''],
      prixMax: [''],
      surfaceMin: [''],
      surfaceMax: [''],
      pieces: [''],
      chambres: [''],
      sallesDeBain: [''],
      ville: [''],
      pays: [''],
      localisation: ['']
    });

    // Réagir aux changements du formulaire
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

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
      next: (data) => {
        this.properties = data;
        this.filteredProperties = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des propriétés:', error);
        this.error = 'Erreur lors du chargement des propriétés.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    
    this.filteredProperties = this.properties.filter(property => {
      let matches = true;

      // Filtre par titre
      if (filters.titre && property.titre) {
        matches = matches && property.titre.toLowerCase().includes(filters.titre.toLowerCase());
      }

      // Filtre par type
      if (filters.type) {
        matches = matches && property.type === filters.type;
      }

      // Filtre par statut
      if (filters.statut) {
        matches = matches && property.statut === filters.statut;
      }

      // Filtre par prix
      if (filters.prixMin) {
        matches = matches && property.prix >= filters.prixMin;
      }
      if (filters.prixMax) {
        matches = matches && property.prix <= filters.prixMax;
      }

      // Filtre par surface
      if (filters.surfaceMin) {
        matches = matches && property.surface >= filters.surfaceMin;
      }
      if (filters.surfaceMax) {
        matches = matches && property.surface <= filters.surfaceMax;
      }

      // Filtre par nombre de pièces
      if (filters.pieces) {
        matches = matches && property.pieces >= filters.pieces;
      }

      // Filtre par nombre de chambres
      if (filters.chambres) {
        matches = matches && property.chambres >= filters.chambres;
      }

      // Filtre par nombre de salles de bain
      if (filters.sallesDeBain) {
        matches = matches && property.sallesDeBain >= filters.sallesDeBain;
      }

      // Filtre par ville
      if (filters.ville && property.ville) {
        matches = matches && property.ville.toLowerCase().includes(filters.ville.toLowerCase());
      }

      // Filtre par pays
      if (filters.pays && property.pays) {
        matches = matches && property.pays.toLowerCase().includes(filters.pays.toLowerCase());
      }

      // Filtre par localisation/quartier
      if (filters.localisation && property.localisation) {
        matches = matches && property.localisation.toLowerCase().includes(filters.localisation.toLowerCase());
      }

      return matches;
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredProperties = this.properties;
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

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
