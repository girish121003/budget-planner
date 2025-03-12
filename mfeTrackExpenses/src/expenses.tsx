import React, { useState, useEffect } from 'react';
import './expenses.css';
//import BudgetPlannerApiService from budget-planner-api.service.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getExpenses, getCategories, getBudgetById, Expense, Category, Budget } from './expensesAPI';

function Expenses() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
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
        // Fetch expenses for user 1
        const expensesData = await getExpenses(1);
        setExpenses(expensesData);
        
        // Fetch all categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Fetch budgets for each unique budgetId in expenses
        const uniqueBudgetIds = [...new Set(expensesData.map(expense => expense.budgetId))];
        const budgetsData: Budget[] = [];
        
        for (const budgetId of uniqueBudgetIds) {
          try {
            const budget = await getBudgetById(budgetId);
            budgetsData.push(budget);
          } catch (err) {
            console.error(`Failed to fetch budget ${budgetId}:`, err);
          }
        }
        
        setBudgets(budgetsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get category name by ID
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : `Category ${categoryId}`;
  };
  
  // Get category color by ID
  const getCategoryColor = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#cccccc';
  };
  
  // Get budget name by ID
  const getBudgetName = (budgetId: number): string => {
    const budget = budgets.find(b => b.id === budgetId);
    return budget ? budget.name : `Budget ${budgetId}`;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your submission logic here
  };
  
  const handleEdit = (expense: Expense) => {
    // Set the form data to the expense being edited
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      budgetId: expense.budgetId.toString(),
      categoryId: expense.categoryId.toString(),
      date: expense.date,
      notes: expense.notes || ''
    });
    // You might want to add state to track the expense being edited
    // and change the submit button to "Update" instead of "Add"
  };
  
  const handleDelete = (id: number) => {
    // Implement delete functionality here
    // You could call an API function like deleteExpense(id)
    // and then refresh the expenses list
    if (window.confirm('Are you sure you want to delete this expense?')) {
      console.log('Deleting expense with ID:', id);
      // TODO: Implement actual delete functionality
      // For now, just filter out the expense from the state
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const renderExpenses = () => {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p className="error-message">{error}</p>;
    
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
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td className="amount">${expense.amount.toFixed(2)}</td>
                  <td>{getBudgetName(expense.budgetId)}</td>
                  <td>
                    <span 
                      className="category-badge" 
                      style={{ backgroundColor: getCategoryColor(expense.categoryId) }}
                    >
                      {getCategoryName(expense.categoryId)}
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
                      {categories.map(category => (
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
                          {budget.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
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
