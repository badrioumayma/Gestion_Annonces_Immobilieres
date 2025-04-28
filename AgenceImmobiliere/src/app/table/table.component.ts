import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Property } from '../models/property.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpropertyComponent } from '../addproperty/addproperty.component';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() title: string = ''; // Table title
  @Input() columns: { header: string, field: string, isDate?: boolean }[] = []; // Column definitions
  @Input() data: any[] = []; // Table data
  @Input() actions: { label: string, class: string, handler: (row: any) => void }[] = []; // Action buttons
  @Input() link: string = ''; // Link for "Voir toutes les annonces"
  @Input() linkText: string = ''; // Text for the link
  @Input() properties: Property[] = [];
  @Input() isLoading = false;
  @Output() edit = new EventEmitter<Property>();
  @Output() delete = new EventEmitter<number>();

  sortColumn: string = 'createdAt'; // Default sort by creation date
  sortDirection: 'asc' | 'desc' = 'desc'; // Default sort direction descending (newest first)
  
  searchTerm: string = '';
  filteredProperties: Property[] = [];

  constructor(
    private modalService: NgbModal,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.loadProperties();
  }

  private loadProperties() {
    this.isLoading = true;
    this.propertyService.getAllProperties().subscribe({
      next: (properties: Property[]) => {
        this.filteredProperties = properties;
        this.sortProperties();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des propriétés:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.propertyService.getAllProperties().subscribe({
      next: (properties: Property[]) => {
        if (!this.searchTerm) {
          this.filteredProperties = properties;
        } else {
          this.filteredProperties = properties.filter((property: Property) => 
            property.titre.toLowerCase().includes(this.searchTerm) ||
            property.statut.toLowerCase().includes(this.searchTerm) ||
            property.prix.toString().includes(this.searchTerm)
          );
        }
        this.sortProperties();
      }
    });
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortProperties();
  }

  private sortProperties() {
    this.filteredProperties.sort((a: any, b: any) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      
      if (this.sortColumn === 'createdAt') {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return (dateA - dateB) * direction;
      }
      
      if (typeof a[this.sortColumn] === 'number') {
        return (a[this.sortColumn] - b[this.sortColumn]) * direction;
      }
      
      return String(a[this.sortColumn]).localeCompare(String(b[this.sortColumn])) * direction;
    });
  }

  onEdit(property: Property) {
    const modalRef = this.modalService.open(AddpropertyComponent, { 
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.propertyToEdit = property;
    modalRef.componentInstance.isEditMode = true;

    modalRef.closed.subscribe(() => {
      this.edit.emit(property);
    });
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      this.isLoading = true;
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.delete.emit(id);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
