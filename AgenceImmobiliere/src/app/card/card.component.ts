import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() icon: string = 'bi bi-house'; // e.g., 'bi bi-house'
  @Input() title: string = 'Total Properties'; // e.g., 'Total Properties'
  @Input() value: string = '444'; // e.g., '462'
}
