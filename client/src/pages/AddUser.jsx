import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";
import "./AddUser.css";
function AddUser(){
const navigate = useNavigate();
const [form,setForm]=useState({
name:"",
email:""
});
const [message,setMessage] = useState("");


const saveUser = async(e) => {

    e.preventDefault();

    try {

        const res = await API.post("/users/add", form);

        console.log(res.data);
        console.log("MESSAGE SET");

        setMessage("Customer Saved Successfully ✅");

        setTimeout(()=>{
            navigate("/users");
        },1500);

    } 
    catch(error) {

        console.log(error.response?.data || error.message);

    }

};
return(
<div className="add-user-page">
<h1>
Add Customer
</h1>
{
message && (
<div className="success-message">
{message}
</div>
)
}
<form onSubmit={saveUser}>
<input
placeholder="Name"
value={form.name}
onChange={(e)=>
setForm({...form,name:e.target.value})
}

/>
<input
placeholder="Email"
value={form.email}
onChange={(e)=>
setForm({...form,email:e.target.value})
}

/>
<button>
Save Customer
</button>


</form>
</div>

)

}
export default AddUser;