import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaTrash, FaSearch } from "react-icons/fa";
import "./Leads.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function Leads(){

const navigate = useNavigate();

const [leads,setLeads] = useState([]);
const [search,setSearch] = useState("");

const role = localStorage.getItem("role");


// Get Leads
const fetchLeads = async()=>{

    try{

        const res = await API.get("/leads");

        setLeads(res.data);

    }
    catch(error){

        console.log(error.response?.data || error.message);

    }

};



// Convert Lead
const convertLead = async (id) => {

  if (role !== "admin") {
    alert("Only administrators can convert leads into users.");
    return;
  }

  try {

    await API.post(`/leads/convert/${id}`);

    alert("Lead Converted Successfully ✅");

    fetchLeads();

  } catch (error) {

    console.log(error.response?.data || error.message);

  }

};
// Delete Lead
const deleteLead = async(id)=>{

    try{

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lead?"
        );


        if(!confirmDelete) return;


        await API.delete(`/leads/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });


        alert("Lead deleted successfully 🗑️");


        fetchLeads();


    }
    catch(error){

        console.log(error.response?.data || error.message);

    }

};



// Search
const filteredLeads = leads.filter((lead)=>

    lead.name?.toLowerCase().includes(search.toLowerCase()) ||

    lead.company?.toLowerCase().includes(search.toLowerCase()) ||

    lead.source?.toLowerCase().includes(search.toLowerCase())

);



useEffect(()=>{

    fetchLeads();

},[]);



return(

<div>


<Navbar />

<Sidebar />


<div className="leads-page">


<div className="leads-header">

<div>

<h1>
Leads
</h1>

<p>
Manage your potential customers
</p>

</div>



<button
className="add-lead-btn"
onClick={()=>navigate("/add-lead")}
>
+ Add Lead
</button>


</div>





<div className="lead-search">


<FaSearch/>


<input

placeholder="Search leads..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>





<div className="leads-table">


<table>


<thead>

<tr>

<th>Name</th>
<th>Company</th>
<th>Source</th>
<th>Status</th>
<th>Follow Up</th>
<th>Notes</th>
<th>Action</th>

</tr>

</thead>




<tbody>


{

filteredLeads.length > 0 ?


filteredLeads.map((lead)=>(


<tr key={lead._id}>


<td>
{lead.name}
</td>


<td>
{lead.company}
</td>


<td>
{lead.source}
</td>


<td>

<span className="status">
{lead.status}
</span>

</td>


<td>

{
lead.followUpDate

?

new Date(lead.followUpDate).toLocaleDateString()

:

"Not Set"

}

</td>
<td>{lead.notes || "No Notes"}</td>



<td>


<button

className="convert-btn"

onClick={()=>convertLead(lead._id)}

>

Convert

</button>




{

role === "admin" &&


<button

className="delete-btn"

onClick={()=>deleteLead(lead._id)}

>

<FaTrash />

</button>


}


</td>


</tr>


))


:


<tr>

<td colSpan="6">

No Leads Found

</td>

</tr>


}


</tbody>


</table>


</div>


</div>


</div>

)

}


export default Leads;