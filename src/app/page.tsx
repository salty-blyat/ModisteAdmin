'use client'
import { BarChart } from "./components/Charts/BarChart";
import LineChart from "./components/Charts/LineChart";
import GroupCard from "./components/GroupCard";
import LowStockList from "./components/LowStockList";
import Navbar from "./components/Navbar";
import TotalRevenue from "./components/TotalRevenue"; 
import WeeklyRevenue from './components/Charts/WeeklyRevenue'


export default function Home() {

  return (
    <main>
      <Navbar />
      <div className="ml-60 space-y-9">
        <WeeklyRevenue />
        <LineChart />
        <BarChart />
        <LowStockList />
        <GroupCard />
        <TotalRevenue />



      </div>
    </main >
  );
}
