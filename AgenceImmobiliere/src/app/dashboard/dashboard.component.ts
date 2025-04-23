import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: { total: number, available: number, sold: number, rented: number } = { total: 0, available: 0, sold: 0, rented: 0 };
  recentProperties: any[] = [];  // Adjust type as needed
  properties: any[] = [];  // Adjust type as needed

  constructor() {}

  ngOnInit(): void {
    // Simulate fetching data
    this.stats = {
      total: 100,
      available: 50,
      sold: 30,
      rented: 20
    };

    this.recentProperties = [
      { id: 1, name: 'Property 1' },  // Example data
      { id: 2, name: 'Property 2' }
    ];

    this.properties = [
      { id: 1, name: 'Property A' },
      { id: 2, name: 'Property B' }
    ];
  }

  editProperty(property: any): void {
    console.log('Editing property:', property);
    // Add your edit logic here
  }

  deleteProperty(propertyId: number): void {
    console.log('Deleting property with ID:', propertyId);
    // Add your delete logic here
  }
}
