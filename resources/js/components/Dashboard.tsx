import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [data, setData] = useState({
        total_sales: 0,
        orders: 0,
        new_users: 0,
        return_rate: ''
    });

    useEffect(() => {
        axios.get('/api/dashboard')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="kpi-cards">
                <div className="kpi-card">
                    <h2>Total Sales</h2>
                    <p>${data.total_sales}</p>
                </div>
                <div className="kpi-card">
                    <h2>Orders</h2>
                    <p>{data.orders}</p>
                </div>
                <div className="kpi-card">
                    <h2>New Users</h2>
                    <p>{data.new_users}</p>
                </div>
                <div className="kpi-card">
                    <h2>Return Rate</h2>
                    <p>{data.return_rate}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
