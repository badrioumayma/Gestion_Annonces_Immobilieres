import { Component, OnInit } from '@angular/core';
import { VisiteRequestService } from '../services/visite-request.service';
import { VisiteRequest } from '../models/visite-request.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-visite-requests',
  templateUrl: './visite-requests.component.html',
  styleUrls: ['./visite-requests.component.css']
})
export class VisiteRequestsComponent implements OnInit {
  visiteRequests: VisiteRequest[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private visiteRequestService: VisiteRequestService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.loadVisiteRequests();
  }

  loadVisiteRequests() {
    this.loading = true;
    this.error = null;
    this.visiteRequestService.getAllVisiteRequests().subscribe({
      next: (requests) => {
        console.log('Données reçues:', requests);
        this.visiteRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Erreur lors du chargement des demandes';
        this.loading = false;
      }
    });
  }

  updateStatus(request: VisiteRequest, status: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE') {
    this.visiteRequestService.updateVisiteRequestStatus(request.id!, status).subscribe({
      next: () => {
        request.status = status;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
        alert('Une erreur est survenue lors de la mise à jour du statut.');
      }
    });
  }

  deleteRequest(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.visiteRequestService.deleteVisiteRequest(id).subscribe({
        next: () => {
          this.visiteRequests = this.visiteRequests.filter(request => request.id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Une erreur est survenue lors de la suppression de la demande.');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'EN_ATTENTE':
        return 'status-pending';
      case 'CONFIRMEE':
        return 'status-confirmed';
      case 'ANNULEE':
        return 'status-cancelled';
      default:
        return '';
    }
  }
} 