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
        <!-- User Profile Section -->
        <div class="profile-section">
          <div class="avatar-container">
            <div class="avatar">
              <img src="assets/shared/icons/user-profile.png" alt="User Profile" class="profile-icon">
            </div>
          </div>
          <div class="user-info">
            <h2 class="user-name">John Doe</h2>
            <p class="user-income">Total Monthly Income: $5000</p>
          </div>
          <button class="create-budget-btn">Create Budget</button>
        </div>

        <!-- Budget Allocation and Distribution Section -->
        <div class="budget-layout">
          <!-- Budget Allocation Section -->
          <section class="budget-section">
            <h2 class="section-title">Budget Allocation</h2>
            <p class="section-description">Visual representation of your budget distribution</p>
            
            <button class="action-button">Access Income</button>
            
            <div class="category-cards">
              <div class="category-card">
                <h3>Housing</h3>
                <p class="amount">$1500</p>
              </div>
              <div class="category-card">
                <h3>Transportation</h3>
                <p class="amount">$800</p>
              </div>
              <div class="category-card">
                <h3>Food</h3>
                <p class="amount">$500</p>
              </div>
            </div>
          </section>

          <!-- Budget Distribution Section -->
          <section class="distribution-section">
            <h2 class="section-title">Budget Distribution</h2>
            
            <div class="chart-container">
              <div class="chart-header">Amount</div>
              <div class="pie-chart">
                <svg viewBox="0 0 100 100" class="pie">
                  <!-- Green slice (55%) -->
                  <circle r="25" cx="50" cy="50" fill="transparent"
                    stroke="#9de498"
                    stroke-width="50"
                    stroke-dasharray="172.8 345.6"
                    stroke-dashoffset="0"></circle>
                  
                  <!-- Brown slice (15%) -->
                  <circle r="25" cx="50" cy="50" fill="transparent"
                    stroke="#a08f65"
                    stroke-width="50"
                    stroke-dasharray="47.1 345.6"
                    stroke-dashoffset="-172.8"></circle>
                  
                  <!-- Blue slice (30%) -->
                  <circle r="25" cx="50" cy="50" fill="transparent"
                    stroke="#5b718c"
                    stroke-width="50"
                    stroke-dasharray="94.2 345.6"
                    stroke-dashoffset="-219.9"></circle>
                </svg>
              </div>
              <div class="categories-label">Categories</div>
            </div>
          </section>
        </div>

        <!-- Key Stats and User Feedback Layout -->
        <div class="stats-feedback-layout">
          <!-- Key Stats Section -->
          <section class="stats-section">
            <h2 class="section-title">Key Stats</h2>
            
            <div class="stats-list">
              <div class="stat-item">
                <div class="stat-icon expenses-icon">
                  <img src="assets/shared/icons/expenses-icon.png" alt="Expenses">
                </div>
                <div class="stat-info">
                  <span class="stat-name">Total Expenses</span>
                </div>
                <div class="stat-value">$2000</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-icon balance-icon">
                  <img src="assets/shared/icons/summary-icon.png" alt="Balance">
                </div>
                <div class="stat-info">
                  <span class="stat-name">Remaining Balance</span>
                </div>
                <div class="stat-value">$3000</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-icon savings-icon">
                  <img src="assets/shared/icons/settings-icon.png" alt="Savings">
                </div>
                <div class="stat-info">
                  <span class="stat-name">Savings</span>
                </div>
                <div class="stat-value">$1000</div>
              </div>
            </div>
          </section>

          <!-- User Feedback Section -->
          <section class="feedback-section">
            <h2 class="section-title">User Feedback</h2>
            <p class="section-description">See what our users say about Budget Buddy</p>
            
            <div class="feedback-list">
              <div class="feedback-card">
                <div class="user-info">
                  <div class="user-avatar"></div>
                  <span class="user-name">Alice Smith</span>
                  <div class="rating">★★★★★</div>
                </div>
                <p class="feedback-text">Great app! It helped me save a lot</p>
              </div>
              
              <div class="feedback-card">
                <div class="user-info">
                  <div class="user-avatar"></div>
                  <span class="user-name">Bob Johnson</span>
                  <div class="rating">★★★★★</div>
                </div>
                <p class="feedback-text">Very user-friendly and insightful</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Dummy Section 1 for Scroll Testing -->
        <div class="dummy-section">
          <section class="dummy-content">
            <h2 class="section-title">Financial Tips</h2>
            <p class="section-description">Helpful advice to improve your financial health</p>
            
            <div class="tips-container">
              <div class="tip-card">
                <h3>Create an Emergency Fund</h3>
                <p>Set aside 3-6 months of expenses in case of unexpected events. This provides a financial safety net and peace of mind.</p>
              </div>
              
              <div class="tip-card">
                <h3>Pay Off High-Interest Debt</h3>
                <p>Prioritize paying down credit cards and other high-interest loans to save money on interest payments over time.</p>
              </div>
              
              <div class="tip-card">
                <h3>Automate Your Savings</h3>
                <p>Set up automatic transfers to savings accounts on payday to ensure consistent saving without thinking about it.</p>
              </div>
              
              <div class="tip-card">
                <h3>Follow the 50/30/20 Rule</h3>
                <p>Allocate 50% of income to necessities, 30% to wants, and 20% to savings and debt repayment for balanced finances.</p>
              </div>
              
              <div class="tip-card">
                <h3>Review Subscriptions Regularly</h3>
                <p>Take inventory of recurring subscriptions and cancel those you don't use to eliminate unnecessary expenses.</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Dummy Section 2 for Scroll Testing -->
        <div class="dummy-section">
          <section class="dummy-content">
            <h2 class="section-title">Financial Calendar</h2>
            <p class="section-description">Plan your financial goals throughout the year</p>
            
            <div class="calendar-container">
              <div class="month-card">
                <h3>January</h3>
                <p>Set annual financial goals and create a yearly budget plan.</p>
              </div>
              
              <div class="month-card">
                <h3>April</h3>
                <p>Tax season - prepare and file your taxes before the deadline.</p>
              </div>
              
              <div class="month-card">
                <h3>July</h3>
                <p>Mid-year financial checkup - review progress on your annual goals.</p>
              </div>
              
              <div class="month-card">
                <h3>September</h3>
                <p>Back-to-school budgeting and expense planning.</p>
              </div>
              
              <div class="month-card">
                <h3>December</h3>
                <p>Year-end tax planning and holiday budgeting strategies.</p>
              </div>
              
              <div class="month-card long-text">
                <h3>Financial Planning Tips</h3>
                <p>Remember to review your budget regularly and adjust as needed. Track your expenses to identify areas where you can cut back. Set specific, measurable financial goals with deadlines. Consider working with a financial advisor for personalized advice. Build an investment strategy that aligns with your long-term goals.</p>
                <p>Long-term financial planning is essential for securing your future. Start by setting clear goals for retirement, education, or major purchases. Then, develop a realistic plan to achieve these goals through consistent saving and strategic investing. Review and adjust your plan periodically as your life circumstances change.</p>
                <p>Financial literacy is key to making informed decisions about your money. Take time to educate yourself about basic financial concepts, investment options, and tax strategies. This knowledge will empower you to take control of your finances and build a secure future for yourself and your family.</p>
              </div>
            </div>
          </section>
        </div>
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
      display: flex;
      align-items: center;
      margin-bottom: 10px;
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
      font-weight: 500;
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
export class RemoteEntryComponent {
  // No longer need the navigationItems array since we removed the Quick Actions section
}
