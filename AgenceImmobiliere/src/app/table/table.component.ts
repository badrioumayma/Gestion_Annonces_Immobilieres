import { Component ,Input } from '@angular/core';

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

}
