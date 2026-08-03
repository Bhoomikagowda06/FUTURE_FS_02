import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";


function Register(){

    const navigate = useNavigate();
    

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleRegister = async(e)=>{

        e.preventDefault();

        try{

            await API.post("/users/register",{
                name,
                email,
                password
            });

            alert("Registration successful");

            navigate("/");

        }
        catch (error) {

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    alert(JSON.stringify(error.response?.data));

}

    };


    return(

        <div className="register-page">

            <div className="register-card">

                <h2>Mini CRM</h2>

                <p>Create your account</p>


                <form onSubmit={handleRegister}>


                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />


                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />


                    <button>
                        Register
                    </button>


                </form>


                <div className="login-link">

                    Already have an account?

                    <span onClick={()=>navigate("/")}>
                        Login
                    </span>

                </div>


            </div>

        </div>

    )

}


export default Register;