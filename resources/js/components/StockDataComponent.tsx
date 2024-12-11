import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockDataComponent: React.FC = () => {
    const [stockData, setStockData] = useState<any>(null);

    useEffect(() => {
        axios.get('/api/stocks')
            .then(response => setStockData(response.data))
            .catch(error => console.error('Error fetching stock data:', error));
    }, []);

    const prepareChartData = (symbol: string) => {
        if (!stockData || !stockData[symbol]) return { labels: [], datasets: [] };

        const data = stockData[symbol];
        const labels = data.map((entry: any) => entry.date).reverse();
        const closePrices = data.map((entry: any) => parseFloat(entry.close)).reverse();

        return {
            labels: labels,
            datasets: [
                {
                    label: `${symbol} 주식 가격 (닫기)`,
                    data: closePrices,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                }
            ]
        };
    };

    return (
        <div>
            <h2>상위 주식 데이터</h2>
            {stockData ? (
                <>
                    {Object.keys(stockData).map(symbol => (
                        <div key={symbol}>
                            <h3>{symbol}</h3>
                            <Line data={prepareChartData(symbol)} />
                        </div>
                    ))}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockDataComponent;
