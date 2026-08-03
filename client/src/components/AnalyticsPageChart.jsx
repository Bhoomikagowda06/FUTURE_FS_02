import "./AnalyticsPageChart.css";

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
  Legend,
} from "recharts";

const COLORS = [
  "#2b1fce",
  "#14020b",
  "#14b8a6",
];

export default function AnalyticsPageChart({ chartData }) {

  const revenueData = chartData?.revenueData || [];
  const userData = chartData?.users || [];
  const salesData = chartData?.sales || [];

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="analytics-charts">

  <div className="chart-card large">

    <div className="chart-head">
      <h3>Revenue Overview</h3>

      <span>
        ₹{totalRevenue.toLocaleString()}
      </span>
    </div>

    <ResponsiveContainer width="100%" height={320}>

      <AreaChart data={revenueData}>

        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080215" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0c0321" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#090219"
          strokeWidth={3}
          fill="url(#rev)"
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>

  <div className="bottom-charts">

    <div className="chart-card">

      <h3>Customer Overview</h3>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie
            data={userData}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            label
          >

            {userData.map((item, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

    <div className="chart-card">

      <h3>Sales Analytics</h3>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={salesData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#0b0106"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div> 
   
</div>

        );
    }
