import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import Expenses from './expenses';

// Create Web Component
const TrackerElement = reactToWebComponent(Expenses, React, ReactDOM);

// Register if not already defined
if (!customElements.get('mfe-expense-tracker')) {
  customElements.define('mfe-expense-tracker', TrackerElement);
}

console.log('Web Component defined: <mfe-expense-tracker>');

export default TrackerElement;