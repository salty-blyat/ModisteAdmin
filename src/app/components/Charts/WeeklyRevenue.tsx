import { Card, DatePicker, DatePickerProps } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const currentDate = moment(); // Get the current date
const curweek = currentDate.week(); // Get the week of the year
const curmonth = currentDate.month() + 1; // Get the month (January is 0-based index)
const curyear = currentDate.year(); // 

interface SelectedDateProps {
    week: number;
    month: number;
    year: number;
}
interface WeeklyRevenueData {
    Monday: DailyRevenue;
    Tuesday: DailyRevenue;
    Wednesday: DailyRevenue;
    Thursday: DailyRevenue;
    Friday: DailyRevenue;
    Saturday: DailyRevenue;
    Sunday: DailyRevenue;
}
interface DailyRevenue {
    totalRevenue: number;
    carts: any[];
}

const WeeklyRevenue = () => {
    const [data, setData] = useState<WeeklyRevenueData[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<SelectedDateProps>({
        week: curweek,
        month: curmonth,
        year: curyear
    });

    useEffect(() => {
        // Fetch data based on the selected week
        fetchRevenueData(selectedDate);
    }, [selectedDate]);

    const fetchRevenueData = async (selectedDate: SelectedDateProps) => {
        try {
            const { week, month, year } = selectedDate;
            const url = process.env.NEXT_PUBLIC_GET_REV_WEEKLY;
            const response = await axios.get(`${url}/${week}/${month}/${year}`);
   
            setData(response.data);
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    const onChange: DatePickerProps['onChange'] = (dateString) => {
        const date = dayjs(dateString); // Convert dateString to a Dayjs object
        const year = date.year();
        const month = date.month() + 1;
        const week = getWeekNumberOfMonth(date); // Get the week number

        setSelectedDate({
            week: week,
            month: month,
            year: year
        });
    };

    // Function to get the week number of the month
    const getWeekNumberOfMonth = (date: dayjs.Dayjs): number => {
        // Start of the month
        const startOfMonth = date.startOf('month');

        // Calculate the week number of the month
        const weekOfMonth = date.diff(startOfMonth, 'week') + 1;

        return weekOfMonth;
    };

    // If data is null, return null or handle loading state
    if (data === null) {
        return null;
    }

    const labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ]
    const dataset1Data = [
        data[0].Monday.totalRevenue,
        data[1].Tuesday.totalRevenue,
        data[2].Wednesday.totalRevenue,
        data[3].Thursday.totalRevenue,
        data[4].Friday.totalRevenue,
        data[5].Saturday.totalRevenue,
        data[6].Sunday.totalRevenue
    ]; 
    const DataSet = {
        labels,
        datasets: [
            {
                label: 'Total per day',
                data: dataset1Data,
                backgroundColor: 'rgba(0, 0, 0)',
            },
        ],
    };

    const options = {
        responsive: true,

    };
    const totalWeeklyRevenue = dataset1Data.reduce((acc, rev) => acc + rev, 0);
    return (
        <Card
            className='p-0'
            style={{ width: 'max-content' }}
            title="Weekly Revenue"
            extra={
                <DatePicker
                    className='w-32'
                    placeholder={`${curweek}/${curmonth}/${curyear}`}
                    picker="week"
                    onChange={onChange}
                />
            }
            actions={[
                <>
                    <span className='text-black'>Total weekly revenue: </span>
                    <span className='font-semibold text-gray-900'>${totalWeeklyRevenue}
                    </span>
                </>]}>
            <Bar options={options} data={DataSet} />
        </Card>
    );
};

export default WeeklyRevenue;