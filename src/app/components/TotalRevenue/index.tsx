import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { SyncLoader } from 'react-spinners';

const TotalRevenue = () => {
    const [totalRevenue, setTotalRevenue] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const url = process.env.NEXT_PUBLIC_GET_REV_TODAY || ''
                const response = await axios.get(url);
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
        <Card
        className='h-fit'
            title={`Total Revenue for ${new Date().toLocaleDateString()}`}
        >
            <div className='flex items-center justify-center'> {/* Adjusted className */}
                {totalRevenue != null ? (
                    <div className='text-center'>
                        <h1 className='text-green-900 font-semibold text-xl'>${totalRevenue.toFixed(2)}</h1>
                        <p>Total revenue for today</p>
                    </div>
                ) : (
                    <div className='flex gap-x-2 items-center justify-center'>
                        <SyncLoader color="black" />
                        <span>Loading</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default TotalRevenue;
