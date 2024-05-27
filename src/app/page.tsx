"use client"
import { BarChart } from "./components/Charts/BarChart";
import LineChart from "./components/Charts/LineChart";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="ml-60 space-y-9">
        <LineChart />
        <BarChart />
      </div>
    </main >
  );
}
