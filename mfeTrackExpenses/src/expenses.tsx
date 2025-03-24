import React, { useState, useEffect } from 'react';
import './expenses.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getExpenses, getCategories, getBudgetsByUserId, createExpense, Expense, Category, Budget, User } from './expensesAPI';

function Expenses() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    budgetId: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch expenses with UUID for real API
        const expensesData = await getExpenses('550e8400-e29b-41d4-a716-446655440000');
        
        // Verify that expenses is an array before setting state
        if (Array.isArray(expensesData)) {
          console.log('Expenses data:', expensesData); // Log the structure
          setExpenses(expensesData);
        } else {
          console.error('Expenses data is not an array:', expensesData);
          setExpenses([]);
        }
        
        // Fetch all categories
        const categoriesData = await getCategories();
        setCategories(categoriesData || []);

        // Get budgets with UUID
        const budgetsData = await getBudgetsByUserId('550e8400-e29b-41d4-a716-446655440000');
        setBudgets(budgetsData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get category ID from expense, handling different formats
  const getCategoryId = (expense: Expense): string => {
    return String(expense.category_id || expense.categoryId || '');
  };
  
  // Get budget ID from expense, handling different formats
  const getBudgetId = (expense: Expense): string => {
    return String(expense.budget_id || expense.budgetId || '');
  };

  // Get category name by ID - with additional null checks
  const getCategoryName = (expense: Expense): string => {
    if (!categories || categories.length === 0) return `Unknown Category`;
    const categoryId = getCategoryId(expense);
    if (!categoryId) return `Unknown Category`;
    
    const category = categories.find(c => c && c.id === categoryId);
    return category ? category.name : `Category ${categoryId}`;
  };
  
  // Get budget name by ID - updated to work with string IDs and null checks
  const getBudgetName = (expense: Expense): string => {
    if (!budgets || budgets.length === 0) return `Unknown Budget`;
    const budgetId = getBudgetId(expense);
    if (!budgetId) return `Unknown Budget`;
    
    const budget = budgets.find(b => b && b.id === budgetId);
    return budget ? budget.name : `Budget ${budgetId}`;
  };

  // Format currency with dollar sign and 2 decimal places
  const formatCurrency = (amount: string | number): string => {
    if (amount === undefined || amount === null) return "$0.00";
    return `$${parseFloat(String(amount)).toFixed(2)}`;
  };

  // Format amount value for display, handling both string and number types
  const formatAmount = (amount: any): string => {
    if (amount === undefined || amount === null) return "$0.00";
    
    // Convert to number regardless of input type
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Check if it's a valid number after conversion
    if (isNaN(numericAmount)) return "$0.00";
    
    return numericAmount.toFixed(2);
  };

  const [activeTab, setActiveTab] = useState('expense'); // 'income' or 'expense'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      console.log('prev', prev);
     return {
      ...prev,
      [name]: value
    }});
  };

  const handleReset = () => {
    setFormData({
      description: '',
      amount: '',
      budgetId: '',
      categoryId: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (activeTab !== 'expense') {
      // Handle income submission if needed
      return;
    }
    
    try {
      // Validate form data
      if (!formData.amount || !formData.description || !formData.categoryId || !formData.budgetId) {
        alert('Please fill out all required fields');
        return;
      }
      
      // Log the form data to verify values
      console.log("Submitting form data:", formData);
      
      // Prepare the expense data for submission using snake_case keys for API
      const expenseData = {
        budget_id: formData.budgetId, // Use snake_case as expected by API
        category_id: formData.categoryId, // Use snake_case as expected by API
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
        notes: formData.notes || undefined
      };
      
      console.log("Transformed expense data for API:", expenseData);
      
      // Submit the expense data
      const createdExpense = await createExpense(expenseData, '550e8400-e29b-41d4-a716-446655440000');
      
      // Update the UI with the new expense
      setExpenses(prevExpenses => [...prevExpenses, createdExpense]);
      
      // Reset the form
      handleReset();
      
      // Show success message
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error submitting expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };
  
  const handleEdit = (expense: Expense) => {
    // Set the form data to the expense being edited
    setFormData({
      description: expense.description || '',
      amount: typeof expense.amount === 'number' ? expense.amount.toString() : expense.amount || '',
      budgetId: getBudgetId(expense),
      categoryId: getCategoryId(expense),
      date: expense.date || new Date().toISOString().split('T')[0],
      notes: expense.notes || ''
    });
    // You might want to add state to track the expense being edited
    // and change the submit button to "Update" instead of "Add"
  };
  
  const handleDelete = (id: any) => {
    // Implement delete functionality here
    // You could call an API function like deleteExpense(id)
    // and then refresh the expenses list
    if (window.confirm('Are you sure you want to delete this expense?')) {
      console.log('Deleting expense with ID:', id);
      // TODO: Implement actual delete functionality
      // For now, just filter out the expense from the state
      setExpenses(expenses.filter(expense => String(expense.id) !== String(id)));
    }
  };

  const renderExpenses = () => {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p className="error-message">{error}</p>;
    
    // Add extra safety check
    if (!expenses || !Array.isArray(expenses)) {
      return <p className="error-message">No valid expenses data available</p>;
    }
    
    return (
      <div className="expenses-list">
        <h2>Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Budget</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => expense && (
                <tr key={String(expense.id)}>
                  <td>{expense.description}</td>
                  <td className="amount">${formatAmount(expense.amount)}</td>
                  <td>{getBudgetName(expense)}</td>
                  <td>
                    <span className="category-badge">
                      {getCategoryName(expense)}
                    </span>
                  </td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(expense)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(expense.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="expenses-container">
      <h1 className="expenses-title">Add Income/Expenses</h1>

      {/* User information */}
      {!loading && user && user.id > 0 && (
        <div className="user-info">
          <p>Welcome, <strong>{user.name}</strong> ({user.email})</p>
        </div>
      )}

      {/* Form section - Full width */}
      <div className="form-section">
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'income' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('income');
              handleReset();
            }}
          >
            Add Income
          </button>
          <button 
            className={`tab-button ${activeTab === 'expense' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTab('expense');
              handleReset();
            }}
          >
            Add Expenses
          </button>
        </div>

        <form onSubmit={handleSubmit} className="expenses-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div className="input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  name="amount"
                  className="form-input dollar-input"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                />
              </div>
              <small className="form-hint">Add income or expense amount</small>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <div className="input-wrapper">
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {activeTab === 'expense' && (
              <>
                <div className="form-group">
                  <label htmlFor="categoryId" className="form-label">Category</label>
                  <div className="input-wrapper">
                    <select
                      id="categoryId"
                      name="categoryId"
                      className="form-input"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.filter(cat => cat.category_type === 'expense').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="budgetId" className="form-label">Budget</label>
                  <div className="input-wrapper">
                    <select
                      id="budgetId"
                      name="budgetId"
                      className="form-input"
                      value={formData.budgetId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a budget</option>
                      {budgets.map(budget => (
                        <option key={budget.id} value={budget.id}>
                          {budget.name} ({formatCurrency(budget.amount)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'income' && (
              <div className="form-group">
                <label htmlFor="categoryId" className="form-label">Category</label>
                <div className="input-wrapper">
                  <select
                    id="categoryId"
                    name="categoryId"
                    className="form-input"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat.category_type === 'income').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="description"
                  className="form-input"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Notes (Optional)</label>
              <div className="input-wrapper">
                <textarea
                  name="notes"
                  className="form-input form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes here"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="button-container">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Expenses Table - Below the form */}
      <div className="expenses-table-section">
        {renderExpenses()}
      </div>
    </div>
  );
}

export default Expenses;
