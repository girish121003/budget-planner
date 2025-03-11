import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-ui-profile-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="profile-header">
      <div class="profile-info">
        <div class="avatar-container">
          <img *ngIf="avatarUrl" [src]="avatarUrl" alt="User avatar" class="avatar">
          <div *ngIf="!avatarUrl" class="avatar-placeholder">
            <span>{{getUserInitials()}}</span>
          </div>
        </div>
        <div class="profile-details">
          <h2 class="profile-name">{{name}}</h2>
          <p class="profile-income">Total Monthly Income: {{formatCurrency(income)}}</p>
        </div>
      </div>
      <div class="profile-actions">
        <app-ui-button>{{buttonText}}</app-ui-button>
      </div>
    </div>
  `,
  styles: [`
    .profile-header {
      background-color: var(--background-secondary, #F5F5F5);
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .profile-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .avatar-container {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      background-color: var(--brand-primary, #C26B1B);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
    }
    .profile-details {
      display: flex;
      flex-direction: column;
    }
    .profile-name {
      margin: 0 0 0.25rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary, #111827);
    }
    .profile-income {
      margin: 0;
      font-size: 1rem;
      color: var(--text-secondary, #4B5563);
    }
    .profile-actions {
      flex-shrink: 0;
    }
  `]
})
export class ProfileHeaderComponent {
  @Input() name: string = '';
  @Input() income: number = 0;
  @Input() avatarUrl?: string;
  @Input() buttonText: string = 'Create Budget';
  
  getUserInitials(): string {
    return this.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
} 