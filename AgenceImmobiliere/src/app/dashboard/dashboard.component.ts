import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  unpublishedListings = [
    { id: 1, title: 'Appartement 3 pièces à Paris', creationDate: new Date(), status: 'Brouillon' },
    { id: 2, title: 'Maison à Lyon', creationDate: new Date(), status: 'Brouillon' }
  ];

  recentUsers = [
    { id: 1, name: 'Jean Dupont', role: 'Agent', registrationDate: new Date() },
    { id: 2, name: 'Marie Curie', role: 'Propriétaire', registrationDate: new Date() }
  ];

  // Columns for the unpublished listings table
  listingColumns = [
    { header: 'Titre', field: 'title' },
    { header: 'Date de Création', field: 'creationDate', isDate: true },
    { header: 'Statut', field: 'status' }
  ];

  // Actions for the unpublished listings table
  listingActions = [
    { label: 'Publier', class: 'btn-success', handler: (row: any) => this.publishListing(row.id) },
    { label: 'Modifier', class: 'btn-primary', handler: (row: any) => this.editListing(row.id) },
    { label: 'Supprimer', class: 'btn-danger', handler: (row: any) => this.deleteListing(row.id) }
  ];

  // Columns for the recent users table
  userColumns = [
    { header: 'Nom', field: 'name' },
    { header: 'Rôle', field: 'role' },
    { header: 'Date d\'Inscription', field: 'registrationDate', isDate: true }
  ];

  // Actions for the recent users table
  userActions = [
    { label: 'Voir', class: 'btn-info', handler: (row: any) => this.viewUser(row.id) },
    { label: 'Suspendre', class: 'btn-warning', handler: (row: any) => this.suspendUser(row.id) }
  ];

  ngOnInit() {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jour 1', 'Jour 2', 'Jour 3', '...', 'Jour 30'],
          datasets: [{
            label: 'Annonces Publiées',
            data: [5, 10, 8, 12, 15],
            borderColor: '#007bff',
            fill: false
          }, {
            label: 'Demandes Envoyées',
            data: [3, 7, 5, 9, 10],
            borderColor: '#28a745',
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  publishListing(id: number) {
    console.log(`Publier l'annonce ${id}`);
  }

  editListing(id: number) {
    console.log(`Modifier l'annonce ${id}`);
  }

  deleteListing(id: number) {
    console.log(`Supprimer l'annonce ${id}`);
  }

  viewUser(id: number) {
    console.log(`Voir l'utilisateur ${id}`);
  }

  suspendUser(id: number) {
    console.log(`Suspendre l'utilisateur ${id}`);
  }
}