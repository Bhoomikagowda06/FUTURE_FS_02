import "./AnalyticsChart.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";


const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 32000 },
  { month: "Jun", revenue: 29000 },
  { month: "Jul", revenue: 38000 }
];


const userData = [
  { name: "Active", value: 72 },
  { name: "New", value: 18 },
  { name: "Inactive", value: 10 }
];


const salesData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 160 },
  { month: "Mar", orders: 210 },
  { month: "Apr", orders: 280 },
  { month: "May", orders: 250 },
  { month: "Jun", orders: 320 }
];


const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b"
];


export default function AnalyticsChart() {


  return (

    <div className="analytics-charts">


      {/* Revenue Chart */}

      <div className="chart-card large">


        <div className="chart-head">

          <h3>
            Revenue Overview
          </h3>


          <span>
            ₹{revenueData[revenueData.length - 1].revenue.toLocaleString()}
          </span>


        </div>



        <ResponsiveContainer
          width="100%"
          height={320}
        >


          <AreaChart data={revenueData}>


            <defs>


              <linearGradient
                id="rev"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >


                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.4}
                />


                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />


              </linearGradient>


            </defs>



            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="month"
            />


            <YAxis />


            <Tooltip />



            <Area

              type="monotone"

              dataKey="revenue"

              stroke="#2563eb"

              strokeWidth={3}

              fill="url(#rev)"

            />


          </AreaChart>


        </ResponsiveContainer>


      </div>





      <div className="bottom-charts">



        {/* User Growth */}


        <div className="chart-card">


          <h3>
            User Growth
          </h3>



          <ResponsiveContainer
            width="100%"
            height={250}
          >


            <PieChart>


              <Pie

                data={userData}

                dataKey="value"

                innerRadius={55}

                outerRadius={85}

              >



                {
                  userData.map((item,index)=>(


                    <Cell

                      key={index}

                      fill={COLORS[index]}

                    />


                  ))
                }



              </Pie>



              <Tooltip />

              <Legend />


            </PieChart>


          </ResponsiveContainer>


        </div>







        {/* Sales Analytics */}


        <div className="chart-card">


          <h3>
            Sales Analytics
          </h3>



          <ResponsiveContainer
            width="100%"
            height={250}
          >


            <BarChart
              data={salesData}
            >


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="month"
              />


              <YAxis />


              <Tooltip />



              <Bar

                dataKey="orders"

                fill="#2563eb"

                radius={[8,8,0,0]}

              />



            </BarChart>


          </ResponsiveContainer>


        </div>



      </div>



    </div>

  );


}