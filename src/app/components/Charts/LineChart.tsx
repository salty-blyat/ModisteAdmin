import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { DatePicker } from "antd";
import moment, { Moment } from 'moment';
interface Order {
    total_quantity_sold: number; // Adjust the type as per your actual data
    total_revenue: number; // Adjust the type as per your actual data
    // Add other properties if needed
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(5);
    const labels = ["Total Sales", "Total Profit"]
    const data1 = orders.map(order => order.total_quantity_sold);
    const data2 = orders.map(order => order.total_revenue);

    useEffect(() => {
        fetchData();
    }, [year, month]);

    const fetchData = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_GET_SALE}${year}/${month}`

            const response = await axios.get(url);
            setOrders(response.data.salesData || []); // Ensure orders is initialized as an empty array if it's undefined
        } catch (error) {
            console.error('Failed to fetch sales data:', error);
        }
    };

    const handleMonthChange = (date: Moment) => {
        const selectedMonth = date ? date.month() + 1 : 1; // Default to 1 if date is null
        setMonth(selectedMonth);
    };

    const handleYearChange = (date: Moment) => {
        const selectedYear = date ? date.year() : new Date().getFullYear();
        setYear(selectedYear);
    };


    const data = {
        labels,
        datasets: [
            {
                label: 'Total Sales',
                data: data1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Total Profit',
                data: data2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },
    };

    return (
        <div className="grid border p-5 rounded-md gap-y-2 max-w-md ">
            <div className="flex">
                <span>Sales Monthly </span>
                <div className="flex justify-end gap-x-5">
                    <DatePicker placeholder={String(month)} picker="month" onChange={handleMonthChange} />
                    <DatePicker placeholder={String(year)} picker="year" onChange={handleYearChange} />
                </div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}
