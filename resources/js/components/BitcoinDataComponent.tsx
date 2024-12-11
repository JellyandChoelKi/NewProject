import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BitcoinData } from '../types/bitcoin';

const BitcoinDataComponent: React.FC = () => {
    const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);

    useEffect(() => {
        axios.get<BitcoinData>('/api/bitcoin')
            .then((response: AxiosResponse<BitcoinData>) => setBitcoinData(response.data))
            .catch((error: Error) => console.error('Error fetching bitcoin data:', error));
    }, []);

    return (
        <div>
            <h2>비트코인 데이터</h2>
            {bitcoinData ? (
                <pre>{JSON.stringify(bitcoinData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BitcoinDataComponent;
