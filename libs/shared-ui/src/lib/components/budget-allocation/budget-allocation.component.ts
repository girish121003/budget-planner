import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface BudgetCategory {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-ui-budget-allocation',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="budget-allocation">
      <h2 class="section-title">Budget Allocation</h2>
      <p class="section-description">{{description}}</p>
      
      <div class="action-container">
        <app-ui-button>{{actionButtonText}}</app-ui-button>
      </div>
      
      <div class="categories-grid">
        <div *ngFor="let category of categories" class="category-card">
          <div class="category-name">{{category.name}}</div>
          <div class="category-amount">{{formatCurrency(category.amount)}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .budget-allocation {
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: var(--text-primary, #111827);
    }
    .section-description {
      font-size: 0.875rem;
      color: var(--text-secondary, #4B5563);
      margin: 0 0 1.25rem 0;
    }
    .action-container {
      margin-bottom: 1.5rem;
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .category-card {
      background-color: white;
      border: 1px solid var(--border-color, #E5E7EB);
      border-radius: 0.375rem;
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    .category-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary, #4B5563);
      margin-bottom: 0.5rem;
    }
    .category-amount {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary, #111827);
    }
  `]
})
export class BudgetAllocationComponent {
  @Input() categories: BudgetCategory[] = [];
  @Input() description = 'Visual representation of your budget distribution';
  @Input() actionButtonText = 'Access Income';
  
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
} 