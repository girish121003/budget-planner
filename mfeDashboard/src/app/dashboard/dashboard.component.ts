import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <p>This is the remote dashboard component.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      border-radius: 8px;
      background-color: #f5f5f5;
      margin: 20px;
    }
  `]
})
export class DashboardComponent {} 