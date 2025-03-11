import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn" 
      [ngClass]="{
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary'
      }"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      outline: none;
    }
    .btn-primary {
      background-color: var(--brand-primary, #C26B1B);
      color: white;
    }
    .btn-primary:hover {
      background-color: var(--brand-primary-dark, #A45615);
    }
    .btn-secondary {
      background-color: var(--brand-secondary, #F5F5F5);
      color: var(--text-primary, #111827);
    }
    .btn-secondary:hover {
      background-color: var(--border-color, #E5E7EB);
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
} 