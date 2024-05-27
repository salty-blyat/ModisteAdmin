'use client'
import { Card, DatePicker } from 'antd';
import axios from 'axios';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Moment } from 'moment';
import { Bar } from 'react-chartjs-2'
interface MonthlySalesData {
    month: string; // Assuming month is a string, adjust if it's a number or another type
    total_sales: number; // Adjust the type as per your data
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,

};

export function BarChart() {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Default to current year
    const [salesData, setSalesData] = useState<{ annualTotalSales: number; monthlySales: MonthlySalesData[] } | null>(null);

    useEffect(() => {
        // Fetch sales data from the API whenever the year changes
        fetchSalesData(selectedYear);

    }, [selectedYear]);

    const handleYearChange = (date: Moment) => {
        if (!date) return "No date selected";
        const selectedYear = date.year();
        setSelectedYear(selectedYear);

        // Fetch sales data for the selected year
        fetchSalesData(selectedYear);
    };


    const fetchSalesData = (year: number) => { // Adjust the parameter type to number
        const GetSales = process.env.NEXT_PUBLIC_GET_SALE;
        axios.get(`${GetSales}${year}`)
            .then(response => {
                const { data } = response;
                console.log("Sales data fetched successfully:", data);
                setSalesData(data);
            })
            .catch(error => {
                console.error('Error fetching sales data:', error);
            });
    };

    if (!salesData) {
        return <div>Loading...</div>;
    }

    const { annualTotalSales, monthlySales } = salesData;

    const labels = monthlySales.map((monthData: MonthlySalesData) => monthData.month);
    const dataset1Data = monthlySales.map((monthData: MonthlySalesData) => monthData.total_sales);

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: dataset1Data,
                backgroundColor: 'rgba(0, 0, 0)',
            },
        ],
    };

    return (
        <Card
            className='p-0'
            style={{ width: 'max-content' }}
            title="Sale Annually"
            extra={
                <DatePicker
                    className='w-20'
                    placeholder={String(selectedYear)}
                    picker="year"
                    onChange={handleYearChange}
                />
            }
            actions={[
                <>
                    <span className='text-black'>Total annually: </span>
                    <span className='font-semibold text-gray-900'> $ {annualTotalSales}</span>
                </>]}>
            <Bar className='max-w-2xl' options={options} data={data} />



        </Card >
    );
}
