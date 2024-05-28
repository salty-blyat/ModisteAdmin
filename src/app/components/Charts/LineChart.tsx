import { Card, DatePicker } from "antd";
import axios from 'axios';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Moment } from 'moment';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


interface Product {
    product_name: string;
    product_price: number;
    product_discount: number;
}

interface Order {
    total_quantity_sold: number;
    total_revenue: number;
    products: Product[];
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
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

export default function LineChart() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
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
                backgroundColor: 'green',
            },
            {
                label: 'Total Profit',
                data: data2,
                backgroundColor: 'blue',
            },
        ],
    };

    // Loop through all orders and sum the product prices
    const totalSales = orders.reduce((total, order) => {
        // Calculate the total revenue for each product in the order
        const orderTotal = order.total_revenue;
        return total + orderTotal;
    }, 0);



    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },
    };
 
    return (
        <Card
            style={{ width: 'max-content' }}
            title="Sale Monthly"
            extra={
                <>
                    <DatePicker
                        className="mr-2 w-16 "
                        placeholder={String(month)}
                        picker="month"
                        onChange={handleMonthChange}
                    />
                    <DatePicker
                        className="w-20"
                        placeholder={String(year)}
                        picker="year"
                        onChange={handleYearChange}
                    />
                </>
            }
            actions={[
                <>
                    <span className='text-black'>Total Sales: </span>
                    <span className='text-green-900 font-semibold'>${totalSales.toFixed(2)}</span>
                </>]} >

            <Line className="max-w-2xl" data={data} options={options} />
        </Card >
    );
}
