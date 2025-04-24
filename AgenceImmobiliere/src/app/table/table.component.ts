import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
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

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.properties.sort((a: any, b: any) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      return a[column] > b[column] ? direction : -direction;
    });
  }

  onEdit(property: Property) {
    this.edit.emit(property);
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      this.delete.emit(id);
    }
  }
}
