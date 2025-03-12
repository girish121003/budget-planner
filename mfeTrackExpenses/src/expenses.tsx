import React, { useState } from 'react';
import './expenses.css';

function Expenses() {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    note: ''
  });
  

  const [activeTab, setActiveTab] = useState('expense'); // 'income' or 'expense'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      amount: '',
      category: '',
      date: '',
      note: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // browser default behavior prevent page refresh
    console.log('Submitting:', formData);
    // Add your submission logic here
  };

  return (
    <div className="expenses-container">
      <h1 className="expenses-title">Add Income/Expenses</h1>

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
          <label className="form-label">Category</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="category"
              className="form-input"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>
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

        <div className="form-group">
          <label className="form-label">Optional Note</label>
          <div className="input-wrapper">
            <textarea
              name="note"
              className="form-input form-textarea"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add note here"
            />
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
  );
}

export default Expenses;
