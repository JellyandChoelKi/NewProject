import React from 'react';
import { createRoot } from 'react-dom/client';
import FinancialAnalysis from './components/FinancialAnalysis';
import '../css/app.css';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<FinancialAnalysis />);