import React from 'react';
import BitcoinDataComponent from './BitcoinDataComponent';
import StockDataComponent from './StockDataComponent';

const FinancialAnalysis: React.FC = () => {
    return (
        <div className="container">
            <header>
                <h1>Investment Analysis</h1>
            </header>
            <div className="main-content">
                <div className="section">
                    <StockDataComponent />
                </div>
                <div className="section">
                    <BitcoinDataComponent />
                </div>
            </div>
        </div>
    );
};

export default FinancialAnalysis;
