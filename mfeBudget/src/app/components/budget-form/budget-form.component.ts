import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetInputComponent } from '@budget-planner/shared-ui';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, BudgetInputComponent],
  template: `
    <div class="budget-form-container">
      <h2 class="section-title">Budget Allocation</h2>
      <p class="section-description">Visual representation of your budget distribution</p>
      
      <div class="action-container">
        <button class="action-button">Access Income</button>
      </div>
      
      <app-budget-input
        [housingAmount]="housingValue"
        [transportationAmount]="transportationValue"
        [foodAmount]="foodValue"
        (housingChange)="onHousingChange($event)"
        (transportationChange)="onTransportationChange($event)"
        (foodChange)="onFoodChange($event)"
      ></app-budget-input>
    </div>
  `,
  styles: [`
    .budget-form-container {
      background-color: #FFFFFF;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
    }
    
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #111827;
    }
    
    .section-description {
      font-size: 0.875rem;
      color: #4B5563;
      margin: 0 0 20px 0;
    }
    
    .action-container {
      margin-bottom: 20px;
    }
    
    .action-button {
      background-color: #B45309;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .action-button:hover {
      background-color: #92400E;
    }
  `]
})
export class BudgetFormComponent {
  housingValue = 1500;
  transportationValue = 800;
  foodValue = 500;
  
  onHousingChange(amount: number): void {
    this.housingValue = amount;
    console.log('Housing amount updated:', amount);
  }
  
  onTransportationChange(amount: number): void {
    this.transportationValue = amount;
    console.log('Transportation amount updated:', amount);
  }
  
  onFoodChange(amount: number): void {
    this.foodValue = amount;
    console.log('Food amount updated:', amount);
  }
} 