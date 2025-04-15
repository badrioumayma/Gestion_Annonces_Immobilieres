import { Component } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent {
  // Static data for the property (you can replace this with dynamic data via a service or input)
  property = {
    image: '/assets/achat.png',
    address: '47 rue des Couronnes',
    price: 850000,
    type: 'Achat',
    description: `Cet appartement est idéal pour un couple ou une petite famille. Vous serez séduit par son agencement optimisé, ses grandes fenêtres et sa luminosité exceptionnelle. Il est situé dans un quartier calme, à proximité des commerces, des écoles et des transports en commun. Parfait pour un premier achat ou un investissement locatif !`,
    details: {
      chambres: 4,
      sallesDeBain: 2,
      area: 1234,
      etages: 3,
      annee: 2023,
      adresse: 'Paris, France'
    }
  };
}