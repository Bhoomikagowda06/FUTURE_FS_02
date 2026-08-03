import "./Sidebar.css";

import {
    FaHome,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    
    FaBox,
    FaUserTie
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";


function Sidebar(){

    const navigate = useNavigate();

    const location = useLocation();



    const menu = [

        {
            name:"Dashboard",
            icon:<FaHome/>,
            path:"/dashboard"
        },

        {
            name:"Users",
            icon:<FaUsers/>,
            path:"/users"
        },
        {
    name:"Leads",
    icon:<FaUserTie/>,
    path:"/leads"
},

        {
            name:"Analytics",
            icon:<FaChartBar/>,
            path:"/analytics"
        },

        
      
{
    name:"Products",
    icon:<FaBox/>,
    path:"/products"
},
{
            name:"Settings",
            icon:<FaCog/>,
            path:"/settings"
        },
    ];



    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/");

    };



    return(

        <div className="sidebar">


            <div className="sidebar-logo">

                Mini CRM

            </div>




            <ul className="sidebar-menu">


            {
                menu.map((item,index)=>(


                    <li

                    key={index}

                    className={
                        location.pathname === item.path
                        ?
                        "active"
                        :
                        ""
                    }

                    onClick={()=>navigate(item.path)}

                    >

                        {item.icon}

                        <span>
                            {item.name}
                        </span>


                    </li>


                ))
            }


            </ul>





            <div

            className="logout"

            onClick={logout}

            >

                <FaSignOutAlt/>

                <span>
                    Logout
                </span>

            </div>



        </div>

    )

}



export default Sidebar;