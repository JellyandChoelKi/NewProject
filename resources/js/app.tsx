import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage  from './components/HomePage';
import FinancialAnalysis from './components/Invest/FinancialAnalysis';
import ProductList from './components/Product/ProductList';
import '../css/app.css';

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/invest" element={<FinancialAnalysis />} />
            <Route path="/products" element={<ProductList />} />
        </Routes>
    </Router>
);

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
