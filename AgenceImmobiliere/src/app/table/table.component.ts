import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Property } from '../models/property.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddpropertyComponent } from '../addproperty/addproperty.component';

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

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // Sort properties by creation date by default (newest first)
    this.sortProperties();
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
    this.properties.sort((a: any, b: any) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      
      // Handle date sorting
      if (this.sortColumn === 'createdAt') {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return (dateA - dateB) * direction;
      }
      
      // Handle numeric sorting
      if (typeof a[this.sortColumn] === 'number') {
        return (a[this.sortColumn] - b[this.sortColumn]) * direction;
      }
      
      // Handle string sorting
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
      this.delete.emit(id);
    }
  }
}
