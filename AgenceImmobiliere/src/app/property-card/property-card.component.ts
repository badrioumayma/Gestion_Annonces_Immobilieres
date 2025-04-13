import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() property: any = {
    id: 1,
    image: '/assets/home.jpg',
    type: 'Achat',
    address: '47 rue des Couronnes, Paris, France',
    price: 850000,
    bedrooms: 4,
    bathrooms: 2,
    floors: 3,
    area: 1234
  };
}
