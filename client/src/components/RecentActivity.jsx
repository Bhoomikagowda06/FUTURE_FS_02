import "./RecentActivity.css";

import { useEffect, useState } from "react";
import API from "../services/api";


export default function RecentActivity() {


  const [orders,setOrders] = useState([]);



  useEffect(()=>{


    const getOrders = async()=>{


      try{


        const res = await API.get("/orders");

        setOrders(res.data);


      }
      catch(error){

        console.log("Order fetch error:",error);

      }


    };


    getOrders();


  },[]);





  return (

    <div className="recent-activity">


      <div className="activity-header">

        <h2>
          Recent Activity
        </h2>


        <button>
          View All
        </button>


      </div>




      <table>


        <thead>

          <tr>

            <th>Customer</th>

            <th>Activity</th>

            <th>Revenue</th>

            

            <th>Date</th>


          </tr>

        </thead>




        <tbody>


        {

          orders.map((item)=>(


            <tr key={item._id}>


              <td>
                {item.customer}
              </td>



              <td>
                Placed Order
              </td>



              <td>
                ₹{item.amount}
              </td>



              



              <td>

                {new Date(item.createdAt).toLocaleDateString()}

              </td>



            </tr>


          ))

        }



        </tbody>


      </table>



    </div>

  );

}