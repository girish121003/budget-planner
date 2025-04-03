import React, { useState, useEffect } from 'react';
import './expenses.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getExpenses, getCategories, getBudgetsByUserId, createExpense, deleteExpense, Expense, Category, Budget, User } from './expensesAPI';
import { ConfirmationModal } from './components/ConfirmationModal';

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

  // Add state for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | number | null>(null);

  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    buttons: { text: string; type: 'primary' | 'secondary'; onClick: () => void; }[];
  }>({
    isOpen: false,
    title: '',
    message: '',
    buttons: []
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
          console.log('Sample expense category_id:', expensesData[0]?.category_id);
          console.log('Sample expense categoryId:', expensesData[0]?.categoryId);
          setExpenses(expensesData);
        } else {
          console.error('Expenses data is not an array:', expensesData);
          setExpenses([]);
        }
        
        // Fetch all categories
        const categoriesData = await getCategories();
        console.log('Categories data:', categoriesData);
        console.log('Sample category:', categoriesData[0]);
        console.log('Categories array length:', categoriesData?.length || 0);
        setCategories(categoriesData || []);

        // Get budgets with UUID
        const budgetsData = await getBudgetsByUserId('550e8400-e29b-41d4-a716-446655440000');
        console.log('Budgets data:', budgetsData);
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


  // Get budget ID from expense, handling different formats
  const getBudgetId = (expense: Expense): string => {
    return String(expense.budget_id || expense.budgetId || '');
  };

  // Get category name by ID - with additional null checks
  const getCategoryName = (expense: Expense): string => {
    console.log('Getting category name for expense:', expense);
    console.log('Current categories:', categories);
    
    if (!categories || categories.length === 0) {
      console.log('No categories available');
      return `Unknown Category`;
    }
    
    const categoryId = getCategoryId(expense);
    console.log('Looking for category with ID:', categoryId);
    console.log('Categories:', categories);
    
    if (!categoryId) {
      console.log('No category ID found in expense');
      return `Unknown Category`;
    }
    
    const category = categories.find(c => {
      console.log('Comparing category:', c);
      console.log('Comparing IDs:', String(c.id), 'vs', String(categoryId));
      return String(c.id) === String(categoryId);
    });
    
    console.log('Found category:', category);
    
    return category ? category.name : `Category ${categoryId}`;
  };
    // Get category ID from expense, handling different formats
    const getCategoryId = (expense: Expense): string => {
      const categoryId = String(expense.category_id || expense.categoryId || '');
      console.log('Getting category ID for expense:', expense);
      console.log('Extracted category ID:', categoryId);
      return categoryId;
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

  // Close modal helper
  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  // Handle delete confirmation
  const handleDelete = async (id: string | number) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Expense',
      message: 'Are you sure you want to delete this expense? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          type: 'secondary',
          onClick: closeModal
        },
        {
          text: 'Delete',
          type: 'primary',
          onClick: async () => {
            try {
              await deleteExpense(id, '550e8400-e29b-41d4-a716-446655440000');
              setExpenses(expenses.filter(expense => String(expense.id) !== String(id)));
              closeModal();
              alert('Expense deleted successfully!');
            } catch (error) {
              console.error('Error deleting expense:', error);
              alert('Failed to delete expense. Please try again.');
              closeModal();
            }
          }
        }
      ]
    });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (activeTab !== 'expense') {
      return;
    }
    
    // Validate form data
    if (!formData.amount || !formData.description || !formData.categoryId || !formData.budgetId) {
      alert('Please fill out all required fields');
      return;
    }

    // Prepare the expense data
    const expenseData = {
      budget_id: formData.budgetId,
      category_id: formData.categoryId,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
      notes: formData.notes || undefined
    };

    try {
      const createdExpense = await createExpense(expenseData, '550e8400-e29b-41d4-a716-446655440000');
      setExpenses(prevExpenses => [...prevExpenses, createdExpense]);
      
      // Show success modal
      setModalConfig({
        isOpen: true,
        title: 'Success',
        message: 'Expense added successfully!',
        buttons: [
          {
            text: 'OK',
            type: 'primary',
            onClick: () => {
              closeModal();
              handleReset();
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error submitting expense:', error);
      setModalConfig({
        isOpen: true,
        title: 'Error',
        message: 'Failed to add expense. Please try again.',
        buttons: [
          {
            text: 'OK',
            type: 'primary',
            onClick: closeModal
          }
        ]
      });
    }
  };

  // Handle edit
  const handleEdit = (expense: Expense) => {
    setModalConfig({
      isOpen: true,
      title: 'Edit Expense',
      message: 'Are you sure you want to edit this expense?',
      buttons: [
        {
          text: 'Cancel',
          type: 'secondary',
          onClick: closeModal
        },
        {
          text: 'Edit',
          type: 'primary',
          onClick: () => {
            setFormData({
              description: expense.description || '',
              amount: typeof expense.amount === 'number' ? expense.amount.toString() : expense.amount || '',
              budgetId: String(expense.budget_id || expense.budgetId || ''),
              categoryId: String(expense.category_id || expense.categoryId || ''),
              date: expense.date || new Date().toISOString().split('T')[0],
              notes: expense.notes || ''
            });
            closeModal();
          }
        }
      ]
    });
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
                <th>Category</th>
                <th>Budget</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => expense && (
                <tr key={String(expense.id)}>
                  <td>
                    <span className="category-badge">
                      {getCategoryName(expense)}
                    </span>
                  </td>
                  <td>{getBudgetName(expense)}</td>
                  <td className="amount">${formatAmount(expense.amount)}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description}</td>
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

      {/* Updated dynamic modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
      />
    </div>
  );
}

export default Expenses;
