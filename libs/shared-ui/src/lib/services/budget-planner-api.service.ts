import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base API URL
const API_BASE_URL = 'http://localhost:3001';

// Interface definitions
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Budget {
  id: number;
  userId: number;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Expense {
  id: number;
  userId: number;
  budgetId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
}

export interface Report {
  id: number;
  userId: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Settings {
  id: number;
  userId: number;
  currency: string;
  theme: string;
  notifications: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerApiService {
  constructor(private http: HttpClient) {}

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_BASE_URL}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${API_BASE_URL}/users`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${API_BASE_URL}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/users/${id}`);
  }

  // Budgets
  getBudgets(userId?: number): Observable<Budget[]> {
    const url = userId 
      ? `${API_BASE_URL}/budgets?userId=${userId}` 
      : `${API_BASE_URL}/budgets`;
    return this.http.get<Budget[]>(url);
  }

  getBudget(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${API_BASE_URL}/budgets/${id}`);
  }

  createBudget(budget: Omit<Budget, 'id'>): Observable<Budget> {
    return this.http.post<Budget>(`${API_BASE_URL}/budgets`, budget);
  }

  updateBudget(id: number, budget: Partial<Budget>): Observable<Budget> {
    return this.http.patch<Budget>(`${API_BASE_URL}/budgets/${id}`, budget);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/budgets/${id}`);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_BASE_URL}/categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_BASE_URL}/categories/${id}`);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(`${API_BASE_URL}/categories`, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${API_BASE_URL}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/categories/${id}`);
  }

  // Expenses
  getExpenses(userId?: number, budgetId?: number): Observable<Expense[]> {
    let url = `${API_BASE_URL}/expenses`;
    const params: string[] = [];
    
    if (userId) {
      params.push(`userId=${userId}`);
    }
    
    if (budgetId) {
      params.push(`budgetId=${budgetId}`);
    }
    
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    
    return this.http.get<Expense[]>(url);
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${API_BASE_URL}/expenses/${id}`);
  }

  createExpense(expense: Omit<Expense, 'id'>): Observable<Expense> {
    return this.http.post<Expense>(`${API_BASE_URL}/expenses`, expense);
  }

  updateExpense(id: number, expense: Partial<Expense>): Observable<Expense> {
    return this.http.patch<Expense>(`${API_BASE_URL}/expenses/${id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/expenses/${id}`);
  }

  // Reports
  getReports(userId?: number): Observable<Report[]> {
    const url = userId 
      ? `${API_BASE_URL}/reports?userId=${userId}` 
      : `${API_BASE_URL}/reports`;
    return this.http.get<Report[]>(url);
  }

  getReport(id: number): Observable<Report> {
    return this.http.get<Report>(`${API_BASE_URL}/reports/${id}`);
  }

  createReport(report: Omit<Report, 'id'>): Observable<Report> {
    return this.http.post<Report>(`${API_BASE_URL}/reports`, report);
  }

  updateReport(id: number, report: Partial<Report>): Observable<Report> {
    return this.http.patch<Report>(`${API_BASE_URL}/reports/${id}`, report);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/reports/${id}`);
  }

  // Settings
  getSettings(userId: number): Observable<Settings> {
    return this.http.get<Settings>(`${API_BASE_URL}/settings?userId=${userId}`);
  }

  updateSettings(id: number, settings: Partial<Settings>): Observable<Settings> {
    return this.http.patch<Settings>(`${API_BASE_URL}/settings/${id}`, settings);
  }
} 