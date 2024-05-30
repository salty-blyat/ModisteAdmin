'use client'
import Navbar from "@/app/components/Navbar";
import { BarChart } from "@components/Charts/BarChart";
import LineChart from "@components/Charts/LineChart";
import WeeklyRevenue from '@components/Charts/WeeklyRevenue';
import GroupCard from "@components/GroupCard";
import LowStockList from "@components/LowStockList";
import TotalRevenue from "@components/TotalRevenue";
import WelcomeBanner from "./components/Welcome";
import Footer from "./components/Footer/footer";


export default function Home() {

  return (
    <main className="h-screen">
      <Navbar />
      <div className="mx-4 md:mt-5">
        <div className="mt-24 md:mt-0 md:ml-44">

          <WelcomeBanner />



          <div className="my-4 grid md:grid-cols-2 gap-4 ">
            <WeeklyRevenue />
            <LineChart />
            <BarChart />
            <TotalRevenue />
          </div>



          <div className="grid lg:grid-cols- gap-4 my-4">
            <LowStockList />
            <div>
              <GroupCard />
            </div>
          </div>



          <Footer />
        </div>
      </div>
    </main >
  );
}
