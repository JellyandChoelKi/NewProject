import React from 'react';
import BitcoinDataComponent from './BitcoinDataComponent';
import StockDataComponent from './StockDataComponent';

const FinancialAnalysis: React.FC = () => {
    return (
        <div className="container">
            <header>
                <h1>금융시장 분석</h1>
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
