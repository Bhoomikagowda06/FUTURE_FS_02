import "./Analytics.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import AnalyticsPageChart from "../components/AnalyticsPageChart";
import RecentActivity from "../components/RecentActivity";

import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaUsers,
  FaChartLine,
  FaIndianRupeeSign,
  FaCartShopping
} from "react-icons/fa6";


function Analytics() {


  const [analytics,setAnalytics] = useState({

    totalUsers:0,
    totalOrders:0,
    revenue:0

  });
  const [chartData,setChartData] = useState({

    users:[],
    sales:[],
    revenueData:[]

});



  useEffect(()=>{


    const fetchAnalytics = async()=>{


      try{


        const res = await API.get("/analytics");


setAnalytics(res.data);


setChartData({

    users: res.data.users || [],

    sales: res.data.sales || [],

    revenueData: res.data.revenueData || []

});

      }
      catch(error){


        console.log(error);


      }


    };


    fetchAnalytics();


  },[]);




  return (

    <>


      <Navbar />

      <Sidebar />



      <div className="analytics-page">



        <div className="analytics-header">


          <div>

            <h1>
              Analytics Dashboard
            </h1>


            <p>
              Monitor your business performance
            </p>


          </div>



          <select>

            <option>
              Last 30 Days
            </option>


            <option>
              Last 7 Days
            </option>


            <option>
              This Year
            </option>


          </select>



        </div>





        <div className="analytics-cards">



          <StatsCard

            title="Total Users"

            value={analytics.totalUsers}

            icon={<FaUsers />}

            className="analytics-card"

          />





          <StatsCard

            title="Revenue"

            value={`₹${analytics.revenue}`}

            icon={<FaIndianRupeeSign />}

            className="analytics-card"

          />





          <StatsCard

            title="Orders"

            value={analytics.totalOrders}

            icon={<FaCartShopping />}

            className="analytics-card"

          />





          <StatsCard

            title="Growth"

            value="+18%"

            icon={<FaChartLine />}

            className="analytics-card"

          />



        </div>





        <AnalyticsPageChart 
    chartData={chartData}
/>



        <RecentActivity />



      </div>


    </>

  );


}


export default Analytics;