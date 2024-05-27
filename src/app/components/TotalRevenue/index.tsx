import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalRevenue = () => {
    const [totalRevenue, setTotalRevenue] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/getRevenueToday');
                const { total_revenue } = response.data;
                setTotalRevenue(total_revenue);
            } catch (error) {
                console.error('Failed to fetch total revenue:', error);
                // Handle error, such as displaying a message to the user
            }
        };

        fetchTotalRevenue();
    }, []);

    return (
        <Card style={{ width: 'max-content' }} title={`Total Revenue for ${new Date().toLocaleDateString()}`}>
            {totalRevenue !== null ? (
                <>
                    <h1 className='text-green-900 font-semibold text-xl'>$ {totalRevenue.toFixed(2)}</h1>
                    <p>Total revenue for today</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Card>
    );
};

export default TotalRevenue;
