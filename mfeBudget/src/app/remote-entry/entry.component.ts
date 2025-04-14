import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetFormComponent } from '../components/budget-form/budget-form.component';

@Component({
  imports: [CommonModule, BudgetFormComponent],
  selector: 'app-mfe-budget-entry',
  template: `
    <div class="budget-page">
      <h1 class="page-title">Budget Planning</h1>
      <app-budget-form></app-budget-form>
    </div>
  `,
  styles: [`
    .budget-page {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 24px;
      color: #111827;
    }
  `],
  standalone: true
})
export class RemoteEntryComponent {}
