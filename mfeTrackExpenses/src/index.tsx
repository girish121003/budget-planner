// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Expenses from './expenses';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<Expenses />);
}