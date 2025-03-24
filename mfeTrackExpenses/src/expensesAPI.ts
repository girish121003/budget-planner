// api/expensesApi.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface Expense {
  id: string | number;
  user_id?: string | number;
  userId?: number;
  budget_id?: string | number;
  budgetId?: number;
  category_id?: string | number;
  categoryId?: number;
  amount: string | number;
  description: string;
  date: string;
  notes?: string;
}

export interface Category {
  id: string | number;
  user_id: string;
  name: string;
  category_type: string;
  description?: string;
}

export interface Budget {
  id: string | number;
  user_id: string;
  name: string;
  amount: string | number;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getExpenses = async (userId: string | number): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses?user_id=${userId}`);
    console.log('API Response for expenses:', response);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.get<{ data: Category }>(`${API_BASE_URL}/categories/${id}`);
  return response.data.data; // Extract from data wrapper
};

export const getBudgetsByUserId = async (userId: string | number): Promise<Budget[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets?user_id=${userId}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

/**
 * Create a new expense
 * @param expenseData The expense data to create
 * @returns The created expense
 */
export const createExpense = async (expense: Omit<Expense, 'id'>, userId: string | number): Promise<Expense> => {
  try {
    console.log('Sending expense data to API:', expense, 'with user_id:', userId);
    
    // Make sure the expense object has the right properties
    // Remove any camelCase duplicates to avoid confusion
    const cleanedExpense = {
      ...expense,
      user_id: userId,
      // Ensure we're using the snake_case versions
      budget_id: expense.budget_id || expense.budgetId,
      category_id: expense.category_id || expense.categoryId,
    };
    
    // Remove any camelCase versions if they exist
    if ('budgetId' in cleanedExpense) delete cleanedExpense.budgetId;
    if ('categoryId' in cleanedExpense) delete cleanedExpense.categoryId;
    
    console.log('Cleaned expense data being sent:', cleanedExpense);
    
    const response = await axios.post(`${API_BASE_URL}/expenses?user_id=${userId}`, cleanedExpense);
    console.log('API response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};