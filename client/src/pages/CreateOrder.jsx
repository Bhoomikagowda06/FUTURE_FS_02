import "./CreateOrder.css";

import {useLocation} from "react-router-dom";
import {useState} from "react";
import API from "../services/api";


function CreateOrder(){

const location = useLocation();


const product = location.state?.product;



const [customer,setCustomer]=useState("");

const [quantity,setQuantity]=useState(1);



const placeOrder=async()=>{


const order={

customer,

item:product.name,

image:product.image,

price:product.price,

quantity,

amount:product.price * quantity,

status:"Completed"

};


try{


await API.post(
"/orders",
order
);


alert("Order placed successfully");


}


catch(error){

console.log(error);

}



};



return(

<div className="create-order-page">


<h1>
Create Order
</h1>



<img
src={product.image}
alt=""
/>


<h2>
{product.name}
</h2>


<h3>
₹{product.price}
</h3>



<input

placeholder="Customer Name"

value={customer}

onChange={(e)=>setCustomer(e.target.value)}

/>



<input

type="number"

min="1"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

/>



<button onClick={placeOrder}>

Place Order

</button>



</div>

)

}


export default CreateOrder;