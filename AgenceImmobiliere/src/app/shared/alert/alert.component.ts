import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert-modal" *ngIf="show">
      <div class="alert-content">
        <div class="alert-header" [ngClass]="type">
          <h5 class="alert-title">{{title}}</h5>
          <button type="button" class="btn-close" (click)="cancel()"></button>
        </div>
        <div class="alert-body">
          <p>{{message}}</p>
        </div>
        <div class="alert-footer">
          <button type="button" class="btn btn-secondary" (click)="cancel()">{{cancelText}}</button>
          <button type="button" class="btn" [ngClass]="'btn-' + type" (click)="confirm()">{{confirmText}}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1060;
    }
    .alert-content {
      background-color: white;
      border-radius: 5px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .alert-header {
      padding: 15px;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .alert-header.danger {
      background-color: #f8d7da;
      color: #721c24;
    }
    .alert-header.warning {
      background-color: #fff3cd;
      color: #856404;
    }
    .alert-header.success {
      background-color: #d4edda;
      color: #155724;
    }
    .alert-header.info {
      background-color: #d1ecf1;
      color: #0c5460;
    }
    .alert-body {
      padding: 15px;
    }
    .alert-footer {
      padding: 15px;
      border-top: 1px solid #dee2e6;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `]
})
export class AlertComponent {
  @Input() show: boolean = false;
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Êtes-vous sûr de vouloir continuer ?';
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() confirmText: string = 'Confirmer';
  @Input() cancelText: string = 'Annuler';
  
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
} 