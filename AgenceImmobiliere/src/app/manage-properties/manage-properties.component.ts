import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-properties',
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.css']
})
export class ManagePropertiesComponent {
  showForm: boolean = false;
  properties: any[] = [
    {
      id: 1,
      title: 'Appartement 3 pièces à Paris',
      superficie: 75,
      nombrePieces: 3,
      localisation: 'Paris',
      prix: 350000,
      type: 'Achat',
      status: 'Publiée'
    },
    {
      id: 2,
      title: 'Maison à Lyon',
      superficie: 120,
      nombrePieces: 5,
      localisation: 'Lyon',
      prix: 1500,
      type: 'Location',
      status: 'Publiée'
    }
  ];

  propertyColumns = [
    { header: 'Titre', field: 'title' },
    { header: 'Superficie (m²)', field: 'superficie' },
    { header: 'Nombre de pièces', field: 'nombrePieces' },
    { header: 'Localisation', field: 'localisation' },
    { header: 'Prix (€)', field: 'prix' },
    { header: 'Type', field: 'type' },
    { header: 'Statut', field: 'status' }
  ];

  propertyActions = [
    { label: 'Publier', class: 'btn-success', handler: (row: any) => this.publishListing(row.id) },
    { label: 'Modifier', class: 'btn-primary', handler: (row: any) => this.editProperty(row.id) },
    { label: 'Supprimer', class: 'btn-danger', handler: (row: any) => this.deleteProperty(row.id) }
    
  ];

  toggleForm() {
    this.showForm = !this.showForm;
  }

  closeModal(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.toggleForm();
    }
  }

  addProperty(newProperty: any) {
    const newId = this.properties.length + 1;
    const propertyToAdd = {
      id: newId,
      title: `${newProperty.type === 'Achat' ? 'Achat' : 'Location'} - ${newProperty.localisation}`,
      superficie: newProperty.superficie,
      nombrePieces: newProperty.nombrePieces,
      localisation: newProperty.localisation,
      prix: newProperty.prix,
      photos: newProperty.photos,
      description: newProperty.description,
      contact: newProperty.contact,
      type: newProperty.type,
      status: 'Publiée'
    };
    this.properties.push(propertyToAdd);
    this.toggleForm();
  }

  publishListing(id: number) {
    console.log(`Publier l'annonce ${id}`);
  }

  editProperty(id: number) {
    console.log(`Modifier la propriété ${id}`);
  }

  deleteProperty(id: number) {
    console.log(`Supprimer la propriété ${id}`);
    this.properties = this.properties.filter(property => property.id !== id);
  }
}