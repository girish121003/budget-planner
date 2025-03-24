import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../services/reports.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-mfe-reports-entry',
  template: `
    <div class="reports-container">
      <h1>Reports Dashboard</h1>
      <div *ngIf="loading">Loading reports data...</div>
      <div *ngIf="error" class="error-message">{{ error }}</div>
      <div *ngIf="!loading && !error">
        <p>Reports loaded successfully! Check the console for details.</p>
        <p>Total reports: {{ reportsCount }}</p>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .error-message {
      color: red;
      padding: 10px;
      background-color: #ffeeee;
      border-radius: 4px;
    }
  `]
})
export class RemoteEntryComponent implements OnInit {
  loading = true;
  error: string | null = null;
  reportsCount = 0;
  
  // User ID in UUID format
  private userId = '550e8400-e29b-41d4-a716-446655440001';
  
  constructor(private reportsService: ReportsService) {}
  
  ngOnInit(): void {
    this.fetchReports();
  }
  
  private fetchReports(): void {
    this.loading = true;
    this.error = null;
    
    this.reportsService.getReports(this.userId)
      .subscribe({
        next: (reports) => {
          console.log('Reports retrieved successfully:', reports);
          this.reportsCount = reports.length;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching reports:', err);
          this.error = 'Failed to load reports from the API server at http://localhost:8000/api/reports';
          this.loading = false;
        }
      });
  }
}
