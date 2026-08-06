import { useEffect, useState } from "react";
import "./Users.css";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function Users(){

const [users,setUsers] = useState([]);
const [search,setSearch] = useState("");
const [showModal,setShowModal] = useState(false);
const [editUser,setEditUser] = useState(null);

const navigate = useNavigate();
const role = localStorage.getItem("role");


const [form,setForm] = useState({
    name:"",
    email:""
});


// Get Users
const getUsers = async()=>{

    try{

        const res = await API.get("/users");
        setUsers(res.data);

    }
    catch(error){

        console.log(error);

    }

};


// Delete User
const deleteUser = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setUsers(users.filter(user => user._id !== id));

    alert("✅ User deleted successfully!");

  } catch (error) {

    alert("❌ Failed to delete user.");
    console.log(error);

  }

};


const handleDeleteUser = (id) => {
  if (role !== "admin") {
    alert("Only administrators can delete users.");
    return;
  }

  deleteUser(id);
};
useEffect(()=>{

    getUsers();

},[]);



// Add Customer
const addCustomer = async(e)=>{

    e.preventDefault();

    try{

        await API.post("/users/add",form);

        alert("Customer Added");

        setShowModal(false);

        setForm({
            name:"",
            email:""
        });

        getUsers();

    }
    catch(error){

        console.log(error);

    }

};
const handleAddUser = () => {
  if (role !== "admin") {
    alert("Only administrators can add users.");
    return;
  }

  navigate("/add-user");
};



// Search
const filteredUsers = users.filter((user)=>

    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())

);



return (

<div className="users-page">

  <div className="users-header">

    <div className="header-left">
      <h1>Users Management</h1>
      <p>Manage all customers, search, edit and organize your CRM data.</p>
    </div>

    <button
  className="add-btn"
  onClick={handleAddUser}
>
      <FaPlus />
      Add User
    </button>

  </div>


<div className="users-card">


<div className="user-search">

<FaSearch/>

<input

placeholder="Search customers..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>




<table>


<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>



<tbody>


{
filteredUsers.map((user)=>(

<tr key={user._id}>


<td>
{user.name}
</td>


<td>
{user.email}
</td>



<td>

<span className="active">
Active
</span>

</td>



<td>


<button
onClick={()=>setEditUser(user)}
>

<FaEdit/>

</button>



<button onClick={() => handleDeleteUser(user._id)}>
  <FaTrash />
</button>

</td>



</tr>


))
}



</tbody>



</table>



</div>





{
showModal &&

<div className="modal-bg">

<div className="modal">


<h2>
Add Customer
</h2>



<form onSubmit={addCustomer}>


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

</div>

}



</div>


)

}


export default Users;