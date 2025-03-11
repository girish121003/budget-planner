import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="{'card-bordered': bordered}">
      <div class="card-header" *ngIf="title">
        <h3 class="card-title">{{title}}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .card-bordered {
      border: 1px solid var(--border-color, #E5E7EB);
    }
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color, #E5E7EB);
    }
    .card-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary, #111827);
    }
    .card-body {
      padding: 1rem;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() bordered: boolean = false;
} 