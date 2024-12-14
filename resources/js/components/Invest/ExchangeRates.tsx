import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/invest/invest.css';

const ExchangeRates: React.FC = () => {
    const [usdToKrw, setUsdToKrw] = useState<number | null>(null);
    const [jpyToKrw, setJpyToKrw] = useState<number | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get('/api/exchange-rates');
                const rates = response.data;
                setUsdToKrw(rates.usdToKrw);
                setJpyToKrw(rates.jpyToKrw);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    return (
        <div className="exchange-rates">
            <h3>Exchange Rates</h3>
            <p>1 USD to KRW: <span>{usdToKrw ? usdToKrw.toFixed(2)+"원" : 'Loading...'}</span></p>
            <p>1 JPY to KRW: <span>{jpyToKrw ? jpyToKrw.toFixed(2)+"원" : 'Loading...'}</span></p>
        </div>
    );
};

export default ExchangeRates;
