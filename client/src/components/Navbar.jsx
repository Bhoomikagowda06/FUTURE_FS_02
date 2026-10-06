import "./Navbar.css";

import {
    
    FaBell,
    FaUserCircle
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Navbar() {
    const [notifications,setNotifications] = useState([
  {
    id:1,
    message:"Welcome to employee",
    time:"Just now"
  }
]);
    const navigate = useNavigate();
    


    const [showNotification,setShowNotification] = useState(false);

    const [showProfile,setShowProfile] = useState(false);
    const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

};



    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/");

    };



    return(

        <div className="navbar">


            <div className="nav-title">

               

            </div>




            <div className="nav-right">
                <div
  className="nav-menu"
  onClick={() => setShowNotification(!showNotification)}
>
  <FaBell className="nav-icon" />

  <span className="badge">
    {notifications.length}
  </span>

  {showNotification && (
    <div className="dropdown notification">

      <h4>Notifications</h4>

      {notifications.map((item) => (
        <div key={item.id} className="notification-item">
          <strong>{item.message}</strong>
          <p>{item.time}</p>
        </div>
      ))}

    </div>
  )}

</div>



                
            





                








                <div className="nav-menu">


                   <div className="profile-menu">

    <FaUserCircle
        className="profile-icon"
        onClick={() => setShowProfile(!showProfile)}
    />

    {showProfile && (

        <div className="dropdown profile">

            <h4>Bhoomika</h4>

            <p>Administrator</p>

            <button onClick={logout}>
                Logout
            </button>

        </div>

    )}

</div>

                    {
                    showProfile &&

                    <div className="dropdown profile">


                        <h4>
                            Bhoomika
                        </h4>


                        <p>
                            Admin
                        </p>


                        <button onClick={logout}>
                            Logout
                        </button>


                    </div>

                    }


                </div>



            </div>


        </div>

    )

}


export default Navbar;