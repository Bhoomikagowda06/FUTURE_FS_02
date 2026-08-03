import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AddUser from "./pages/AddUser";

import Products from "./pages/Products";

import Sidebar from "./components/Sidebar";
import CreateOrder from "./pages/CreateOrder";


function App() {

  return (

    <Routes>


      {/* Public pages */}

      <Route 
        path="/" 
        element={<Login />} 
      />


      <Route 
        path="/register" 
        element={<Register />} 
      />




      {/* Main pages */}


      <Route 
        path="/dashboard" 
        element={
          <>
            <Sidebar />
            <Dashboard />
          </>
        } 
      />



      <Route 
        path="/users" 
        element={
          <>
            <Sidebar />
            <Users />
          </>
        } 
      />



      <Route 
        path="/analytics" 
        element={
          <>
            <Sidebar />
            <Analytics />
          </>
        } 
      />



      <Route 
        path="/settings" 
        element={
          <>
            <Sidebar />
            <Settings />
          </>
        } 
      />



      <Route 
        path="/add-user" 
        element={
          <>
            <Sidebar />
            <AddUser />
          </>
        } 
      />



      
      <Route 
path="/products" 
element={
<>
<Sidebar/>
<Products/>
</>
}
/>
<Route 
path="/create-order" 
element={
<>
<Sidebar />
<CreateOrder />
</>
}
/>



    </Routes>

  );

}


export default App;