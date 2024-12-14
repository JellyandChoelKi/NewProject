import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptocurrencyData } from '../../types/Invest/bitcoin';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const BitcoinDataComponent: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptocurrencyData[]>([]);

    useEffect(() => {
        axios.get('/api/cryptocurrencies')
            .then(response => {
                setCryptoData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const prepareChartData = (crypto: CryptocurrencyData) => {
        return {
            labels: ['Current Price', '24h High', '24h Low'],
            datasets: [
                {
                    label: `${crypto.name} Prices`,
                    data: [crypto.current_price, crypto['24h_high'], crypto['24h_low']],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                }
            ]
        };
    };

    return (
        <div className="bitcoin-container">
            <h2>Coin</h2>
            {cryptoData.length ? (
                <div className="bitcoin-data">
                    {cryptoData.map((crypto, index) => (
                        <div key={index} className="crypto-chart">
                            <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                            <Line data={prepareChartData(crypto)} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BitcoinDataComponent;
