import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import API from "../services/api";
import "./Login.css";


function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const res = await API.post("/users/login", form);


      localStorage.setItem(
        "token",
        res.data.token
      );


      alert("Login successful");


      navigate("/dashboard");


    } 
    catch(error) {

      console.log(error.response?.data);


      alert(
        error.response?.data?.message || 
        "Login failed"
      );

    }

  };



  return (

    <div className="login-page">


      <div className="login-card">


        <div className="logo-circle">

          <FaUserShield />

        </div>



        <h1>
          MINI CRM
        </h1>



        <p className="subtitle">

          Mini CRM Management System

        </p>




        <form onSubmit={handleLogin}>


          <div className="input-box">


            <FaEnvelope />


            <input

              type="email"

              name="email"

              placeholder="Email Address"

              value={form.email}

              onChange={handleChange}

              required

            />


          </div>




          <div className="input-box">


            <FaLock />


            <input

              type="password"

              name="password"

              placeholder="Password"

              value={form.password}

              onChange={handleChange}

              required

            />


          </div>





          <button className="login-btn">

            Sign In

          </button>



        </form>





        <p className="register-link">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>


        </p>



      </div>


    </div>

  );

}


export default Login;