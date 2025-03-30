import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Dashboard = () => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        axios.get('/api/portfolio', { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => setPortfolio(res.data));
    }, []);

    return (
        <div>
            <h2>My Investment Portfolio</h2>
            <LineChart width={600} height={300} data={portfolio}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" />
                <Tooltip />
                <Line type="monotone" dataKey="purchasePrice" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default Dashboard;
