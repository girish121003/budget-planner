import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Use the real API endpoint
const REPORTS_API_URL = 'http://localhost:8000/api';

/**
 * Interface for a report object
 */
export interface Report {
  id?: string;
  userId: string; // UUID format
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  data?: any;
}

/**
 * Angular service for handling reports API interactions
 */
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = REPORTS_API_URL;
  }

  /**
   * Get reports for a specific user with optional filter by report type
   * @param userId User ID (UUID format) to get reports for
   * @param reportType Optional report type filter
   * @returns Observable with array of reports
   */
  getReports(userId: string, reportType?: string): Observable<Report[]> {
    // Use user_id parameter as expected by the API
    let params = new HttpParams().set('user_id', userId);
    
    if (reportType) {
      params = params.set('report_type', reportType);
    }
    
    return this.http.get<Report[]>(`${this.apiUrl}/reports`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching reports:', error);
          return throwError(() => new Error('Failed to fetch reports. Please try again.'));
        })
      );
  }

  /**
   * Get a specific report by ID
   * @param reportId ID of the report to retrieve
   * @returns Observable with the report
   */
  getReportById(reportId: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/reports/${reportId}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching report ${reportId}:`, error);
          return throwError(() => new Error('Failed to fetch the report. Please try again.'));
        })
      );
  }

  /**
   * Create a new report
   * @param reportData Data for the new report
   * @returns Observable with the created report
   */
  createReport(reportData: {
    user_id: string;
    report_type: string;
    start_date: string;
    end_date: string;
    name?: string;
  }): Observable<Report> {
    // If name is not provided, generate a default name
    if (!reportData.name) {
      reportData.name = `${reportData.report_type} Report ${new Date().toISOString().split('T')[0]}`;
    }
    
    return this.http.post<Report>(`${this.apiUrl}/reports`, reportData)
      .pipe(
        catchError(error => {
          console.error('Error creating report:', error);
          return throwError(() => new Error('Failed to create the report. Please try again.'));
        })
      );
  }

  /**
   * Delete a report by ID
   * @param reportId ID of the report to delete
   * @returns Observable with the operation result
   */
  deleteReport(reportId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reports/${reportId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting report ${reportId}:`, error);
          return throwError(() => new Error('Failed to delete the report. Please try again.'));
        })
      );
  }
} 