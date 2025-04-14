import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="budget-input-container">
      <div class="budget-input-card">
        <label class="budget-label">Housing</label>
        <div class="input-wrapper">
          <span class="currency-symbol">$</span>
          <input 
            type="number"
            class="budget-input"
            [(ngModel)]="housingAmount"
            (blur)="onHousingChange()"
            placeholder="0"
          />
        </div>
      </div>
      
      <div class="budget-input-card">
        <label class="budget-label">Transportation</label>
        <div class="input-wrapper">
          <span class="currency-symbol">$</span>
          <input 
            type="number"
            class="budget-input"
            [(ngModel)]="transportationAmount"
            (blur)="onTransportationChange()"
            placeholder="0"
          />
        </div>
      </div>
      
      <div class="budget-input-card">
        <label class="budget-label">Food</label>
        <div class="input-wrapper">
          <span class="currency-symbol">$</span>
          <input 
            type="number"
            class="budget-input"
            [(ngModel)]="foodAmount"
            (blur)="onFoodChange()"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .budget-input-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }
    
    .budget-input-card {
      background-color: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .budget-label {
      display: block;
      font-size: 16px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .currency-symbol {
      position: absolute;
      left: 12px;
      font-size: 18px;
      font-weight: 700;
      color: #B45309;
    }
    
    .budget-input {
      width: 100%;
      padding: 10px 10px 10px 30px;
      font-size: 18px;
      font-weight: 700;
      color: #B45309;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
      background-color: #F9FAFB;
      outline: none;
    }
    
    .budget-input:focus {
      border-color: #B45309;
      box-shadow: 0 0 0 2px rgba(180, 83, 9, 0.2);
    }
    
    .budget-input::placeholder {
      color: #D1D5DB;
    }
    
    /* Hide the number input arrows */
    .budget-input::-webkit-outer-spin-button,
    .budget-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .budget-input[type=number] {
      -moz-appearance: textfield;
    }
  `]
})
export class BudgetInputComponent {
  @Input() housingAmount = 0;
  @Input() transportationAmount = 0;
  @Input() foodAmount = 0;
  
  @Output() housingChange = new EventEmitter<number>();
  @Output() transportationChange = new EventEmitter<number>();
  @Output() foodChange = new EventEmitter<number>();
  
  onHousingChange(): void {
    this.housingChange.emit(this.housingAmount);
  }
  
  onTransportationChange(): void {
    this.transportationChange.emit(this.transportationAmount);
  }
  
  onFoodChange(): void {
    this.foodChange.emit(this.foodAmount);
  }
} 