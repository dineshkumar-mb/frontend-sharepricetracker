import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoPrice = ({ symbol }) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/prices/crypto/${symbol}`)
            .then(res => setPrice(res.data.price))
            .catch(err => console.error(err));
    }, [symbol]);

    return (
        <div>
            <h3>{symbol.toUpperCase()} Price: ${price}</h3>
        </div>
    );
};

export default CryptoPrice;
