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

  ngOnInit() {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
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

  publishListing(id: number) {
    console.log(`Publier l'annonce ${id}`);
    // Logique pour publier l'annonce
  }

  editListing(id: number) {
    console.log(`Modifier l'annonce ${id}`);
    // Logique pour rediriger vers la page de modification de l'annonce
  }

  deleteListing(id: number) {
    console.log(`Supprimer l'annonce ${id}`);
    // Logique pour supprimer l'annonce
  }

  viewUser(id: number) {
    console.log(`Voir l'utilisateur ${id}`);
  }

  suspendUser(id: number) {
    console.log(`Suspendre l'utilisateur ${id}`);
  }

  exportReport() {
    console.log('Exporter un rapport');
  }
}