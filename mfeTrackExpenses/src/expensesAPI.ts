// api/expensesApi.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export interface Expense {
  id: number;
  userId: number;
  budgetId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  notes?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
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

export const getExpenses = async (userId?: number, budgetId?: number): Promise<Expense[]> => {
  let url = `${API_BASE_URL}/expenses`;
  const params: string[] = [];
  
  if (userId) params.push(`userId=${userId}`);
  if (budgetId) params.push(`budgetId=${budgetId}`);
  if (params.length > 0) url += `?${params.join('&')}`;
  
  const response = await axios.get<Expense[]>(url);
  return response.data;
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_BASE_URL}/categories`);
  return response.data;
};

// Get a specific category by ID
export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get<Category>(`${API_BASE_URL}/categories/${id}`);
  return response.data;
};

// Get a specific budget by ID
export const getBudgetById = async (id: number): Promise<Budget> => {
  const response = await axios.get<Budget>(`${API_BASE_URL}/budgets/${id}`);
  return response.data;
};