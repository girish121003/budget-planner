import axios from 'axios';

const REPORTS_API_URL = 'http://localhost:8000/api';

/**
 * Interface representing a report object
 */
export interface Report {
  id?: number;
  userId: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  data?: any;
}

/**
 * Report service class to handle API interactions for reports
 */
export class ReportsApiService {
  private apiUrl: string;

  constructor(baseUrl = REPORTS_API_URL) {
    this.apiUrl = baseUrl;
  }

  /**
   * Get reports for a specific user and optional report type
   * @param userId User ID to get reports for
   * @param reportType Optional report type filter
   * @returns Promise with array of reports
   */
  async getReports(userId: number, reportType?: string): Promise<Report[]> {
    try {
      let url = `${this.apiUrl}/reports`;
      const params: string[] = [];
      
      // Add user_id as a query parameter (required)
      params.push(`user_id=${userId}`);
      
      // Add report_type as a query parameter if provided
      if (reportType) {
        params.push(`report_type=${reportType}`);
      }
      
      // Append the query parameters to the URL
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await axios.get<Report[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  /**
   * Get a specific report by ID
   * @param reportId Report ID to retrieve
   * @returns Promise with the report
   */
  async getReportById(reportId: number): Promise<Report> {
    try {
      const url = `${this.apiUrl}/reports/${reportId}`;
      const response = await axios.get<Report>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching report with ID ${reportId}:`, error);
      throw error;
    }
  }

  /**
   * Create a new report
   * @param reportData Report data to create
   * @returns Promise with the created report
   */
  async createReport(reportData: {
    user_id: number;
    report_type: string;
    start_date: string;
    end_date: string;
    name?: string;
  }): Promise<Report> {
    try {
      const url = `${this.apiUrl}/reports`;
      
      // If name is not provided, generate a default name
      if (!reportData.name) {
        reportData.name = `${reportData.report_type} Report ${new Date().toISOString().split('T')[0]}`;
      }
      
      const response = await axios.post<Report>(url, reportData);
      return response.data;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  }

  /**
   * Delete a report by ID
   * @param reportId Report ID to delete
   * @returns Promise with the operation result
   */
  async deleteReport(reportId: number): Promise<any> {
    try {
      const url = `${this.apiUrl}/reports/${reportId}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error(`Error deleting report with ID ${reportId}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance of the service
export const reportsApiService = new ReportsApiService();

// Also export a factory function for Angular's dependency injection
export function getReportsApiService(): ReportsApiService {
  return reportsApiService;
} 