import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaChartLine
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from "recharts";





function Dashboard() {

    const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chartData,setChartData] = useState([]);
  const [userGrowth,setUserGrowth] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats,setStats] = useState([]);
  const growth =
users.length > 0 ? users.length * 5 : 0;

   
  const [notifications, setNotifications] = useState(
  JSON.parse(localStorage.getItem("notifications")) || [
    {
      id:1,
      text:"Welcome to Mini CRM!",
      time:"Just now"
    
    }
  ]
);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserGrowth = async()=>{

try{

const res = await API.get("/users/growth");
console.log("GROWTH DATA:", res.data);

setUserGrowth(res.data);

}
catch(error){

console.log(error);

}

};



  const fetchChartData = async()=>{

  try{

    const res = await API.get("/users/stats");

    setChartData(res.data);

  }
  catch(error){

    console.log(error);

  }

};
const fetchActivities = async () => {
    try {
        const res = await API.get("/activity");
        setActivities(res.data);
    } catch (error) {
        console.log(error);
    }
};
useEffect(() => {

  fetchUsers();
  fetchUserGrowth();
  fetchChartData();
   fetchActivities();

}, []);

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar notifications={notifications} />

        <div className="dashboard-content">

          <div className="welcome-box">

            <h1>Welcome Back 👋</h1>

            <p>Mini CRM Management Dashboard</p>

          </div>

          <div className="stats">            <div className="stat-card">
              <FaUsers />
              <div>
                <h3>Total Users</h3>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <FaUserCheck />
              <div>
                <h3>Active Users</h3>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <FaUserPlus />
              <div>
                <h3>New Customers</h3>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <FaChartLine />
              <div>
                <h3>Growth</h3>
                <h2>{growth}%</h2>
              </div>
            </div>

          </div>

          <div className="charts">

            <div className="chart-card">

              <h2>Sales Analytics</h2>

              <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <XAxis dataKey="month" stroke="#000000" />
    <YAxis stroke="#000000" />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="customers"
      stroke="#000000"
      strokeWidth={3}
      dot={{ fill: "#000000", r: 5 }}
      activeDot={{ r: 7, fill: "#000000" }}
    />
  </LineChart>
</ResponsiveContainer>

            </div>

            <div className="chart-card">

              <h2>User Growth</h2>

              <ResponsiveContainer width="100%" height={300}>
  <BarChart data={userGrowth}>
    <XAxis dataKey="month" stroke="#000000" />
    <YAxis stroke="#000000" />
    <Tooltip />
    <Bar
      dataKey="users"
      fill="#000000"
      radius={[8, 8, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

            </div>

          </div>

          <div className="crm-bottom">

  <div className="activity-card">

<h2>Recent Activity</h2>


{
activities.map((activity)=>(
<div className="activity-item" key={activity._id}>

    <span className="activity-dot"></span>

    <div>

        <h4>{activity.message}</h4>

        <p>
            {new Date(activity.createdAt).toLocaleString()}
        </p>

    </div>

</div>

))

}


</div>

</div>



          <div className="quick-panel">

            <h2>Quick Actions</h2>

            <button onClick={() => navigate("/add-user")}>
  + Add Customer
</button>

            <button onClick={() => navigate("/analytics")}>
  View Reports
</button>

            <button onClick={() => navigate("/users")}>
  Manage Users
</button>

          </div>

        </div>

      </div>

    </div>

  

  );

}

export default Dashboard;