import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { ContactInfoComponent } from "../contact-info/contact-info.component";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {
  achatProperties = [
    {
      id: 1,
      image: '/assets/home.jpg',
      type: 'Achat',
      address: '47 rue des Couronnes, Paris, France',
      price: 850000,
      bedrooms: 4,
      bathrooms: 2,
      floors: 3,
      area: 1234
    },
    {
      id: 2,
      image: '/assets/home.jpg',
      type: 'Achat',
      address: '12 avenue des Champs-Élysées, Paris, France',
      price: 1200000,
      bedrooms: 5,
      bathrooms: 3,
      floors: 2,
      area: 1500
    },
    {
      id: 3,
      image: '/assets/home.jpg',
      type: 'Achat',
      address: '25 rue de Rivoli, Paris, France',
      price: 950000,
      bedrooms: 3,
      bathrooms: 2,
      floors: 2,
      area: 1100
    }
  ];

  locationProperties = [
    {
      id: 4,
      image: '/assets/home.jpg',
      type: 'Location',
      address: '30 rue de la Paix, Paris, France',
      price: 3000,
      bedrooms: 2,
      bathrooms: 1,
      floors: 1,
      area: 80
    },
    {
      id: 5,
      image: '/assets/home.jpg',
      type: 'Location',
      address: '15 boulevard Saint-Germain, Paris, France',
      price: 2500,
      bedrooms: 1,
      bathrooms: 1,
      floors: 1,
      area: 60
    },
    {
      id: 6,
      image: '/assets/home.jpg',
      type: 'Location',
      address: '8 rue Montmartre, Paris, France',
      price: 3500,
      bedrooms: 3,
      bathrooms: 2,
      floors: 1,
      area: 100
    }
  ];
}