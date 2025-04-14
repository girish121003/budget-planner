import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mfe-dashboard-entry',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-content">
        <div class="profile-section">
          <div class="avatar-container">
            <div class="avatar">
              <img src="assets/profile-icon.svg" alt="Profile" class="profile-icon">
            </div>
          </div>
          <div class="user-info">
            <h2 class="user-name">John Doe</h2>
            <p class="user-income">Monthly Income: $5,000</p>
          </div>
          <button class="create-budget-btn" routerLink="user-profile">View Profile</button>
        </div>

        <div class="budget-layout">
          <div class="budget-section">
            <h2 class="section-title">Monthly Budget Overview</h2>
            <p class="section-description">Track your monthly spending and savings</p>
            <div class="category-cards">
              <div class="category-card">
                <h3>Total Budget</h3>
                <p class="amount">$3,500</p>
              </div>
              <div class="category-card">
                <h3>Spent</h3>
                <p class="amount">$2,100</p>
              </div>
              <div class="category-card">
                <h3>Remaining</h3>
                <p class="amount">$1,400</p>
              </div>
              <div class="category-card">
                <h3>Savings</h3>
                <p class="amount">$1,500</p>
              </div>
            </div>
          </div>

          <div class="distribution-section">
            <h2 class="section-title">Expense Distribution</h2>
            <p class="section-description">See where your money goes</p>
            <div class="chart-container">
              <div class="chart-header">Monthly Expenses</div>
              <div class="pie-chart">
                <svg class="pie" viewBox="0 0 32 32">
                  <circle r="16" cx="16" cy="16" fill="#4CAF50" />
                  <circle r="8" cx="16" cy="16" fill="#2196F3" />
                </svg>
              </div>
              <div class="categories-label">Categories</div>
            </div>
          </div>
        </div>

        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      font-family: 'Arial', sans-serif;
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      box-sizing: border-box;
      margin-top: 25px;
    }

    .dashboard-content {
      padding: 20px;
      max-width: 100%;
    }

    .profile-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FAF5F2;
      padding: 20px;
      padding-top: 25px;
      padding-bottom: 25px;
      border-radius: 0 0 36px 36px;
      margin-bottom: 40px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      position: relative;
      padding-left: 120px; /* Make space for the avatar */
    }

    .avatar-container {
      position: absolute;
      left: 30px;
      top: -30px; /* Position half above the container */
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 4px solid #C26B1B;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .profile-icon {
      width: 45px;
      height: 45px;
    }

    .user-info {
      flex-grow: 1;
      margin-left: 20px;
    }

    .user-name {
      margin: 0;
      font-size: 1.25rem;
      color: #000;
      font-weight: 500;
    }

    .user-income {
      margin: 5px 0 0;
      color: #000;
      font-weight: 400;
      font-size: 0.95rem;
    }

    .create-budget-btn {
      background-color: #C26B1B;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
      font-size: 0.9rem;
    }

    .create-budget-btn:hover {
      background-color: #A25A0A;
    }

    .budget-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      padding: 0 10px;
    }

    .budget-section {
      flex: 1;
      min-width: 300px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .distribution-section {
      flex: 1;
      min-width: 300px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
    }

    .section-title {
      margin-top: 0;
      color: #333;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .section-description {
      color: #666;
      margin-bottom: 20px;
    }

    .action-button {
      background-color: #C26B1B;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .category-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }

    .category-card {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      width: calc(50% - 15px);
      box-sizing: border-box;
    }

    .category-card h3 {
      margin-top: 0;
      color: #333;
    }

    .amount {
      font-size: 1.5rem;
      color: #C26B1B;
      font-weight: bold;
      margin: 5px 0 0;
    }

    .chart-container {
      margin-top: 15px;
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      position: relative;
      height: 300px;
    }

    .chart-header {
      color: #aab7c4;
      font-size: 0.9rem;
      font-weight: 400;
      text-align: left;
      margin-bottom: 10px;
    }

    .pie-chart {
      height: 220px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .pie {
      width: 220px;
      height: 220px;
      transform: rotate(-90deg);
    }

    .categories-label {
      position: absolute;
      bottom: 15px;
      right: 15px;
      text-align: right;
      color: #aab7c4;
      font-size: 0.9rem;
    }

    .stats-feedback-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin: 30px 10px;
    }
    
    .stats-section, .feedback-section {
      flex: 1;
      min-width: 300px;
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    
    .stats-list {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeaea;
    }
    
    .stat-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    
    .stat-icon img {
      width: 24px;
      height: 24px;
    }
    
    .stat-info {
      flex-grow: 1;
    }
    
    .stat-name {
      font-size: 0.95rem;
      color: #333;
    }
    
    .stat-value {
      font-size: 1.2rem;
      font-weight: 600;
      color: #000;
      min-width: 70px;
      text-align: right;
    }
    
    .feedback-list {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .feedback-card {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
    }
    
    .user-info {
     position: relative;
     bottom: 40px;
    }
    
    .user-avatar {
      width: 30px;
      height: 30px;
      background-color: #ddd;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .user-name {
      font-size: 0.9rem;
      font-weight: bold;
      color: #333;
      margin-right: auto;
    }
    
    .rating {
      color: #f8c100;
      font-size: 0.85rem;
    }
    
    .feedback-text {
      font-size: 0.9rem;
      color: #333;
      margin: 0;
    }

    /* Styles for Dummy Sections */
    .dummy-section {
      margin: 30px 10px;
    }

    .dummy-content {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .tips-container, .calendar-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .tip-card, .month-card {
      background-color: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .tip-card h3, .month-card h3 {
      margin-top: 0;
      color: #C26B1B;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    .tip-card p, .month-card p {
      margin: 0;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .month-card.long-text {
      grid-column: 1 / -1;
    }

    .month-card.long-text p {
      margin-bottom: 15px;
    }

    @media (max-width: 768px) {
      .budget-layout, .stats-feedback-layout {
        flex-direction: column;
      }

      .tips-container, .calendar-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RemoteEntryComponent {}
