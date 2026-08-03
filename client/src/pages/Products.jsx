import "./Products.css";

import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Products(){

    const [products,setProducts] = useState([]);
    const navigate = useNavigate();



    useEffect(()=>{

        const getProducts = async()=>{

            try{

                const res = await API.get("/products");

                setProducts(res.data);

            }
            catch(error){

                console.log(error);

            }

        };


        getProducts();

    },[]);





    return(

        <div className="products-page">


            <h1>
                Products
            </h1>


            <div className="products-grid">


            {
                products.map((product)=>(


                    <div 
                    className="product-card"
                    key={product._id}
                    >


                        <img
                        src={product.image}
                        alt={product.name}
                        />


                        <h2>
                            {product.name}
                        </h2>


                        <p>
                            ₹{product.price}
                        </p>


                        <span>
                            {product.category}
                        </span>


                        <button
onClick={()=>navigate("/create-order",{
    state:{
        product:product
    }
})}
>
    Order Now
</button>


                    </div>


                ))
            }


            </div>


        </div>

    )

}


export default Products;