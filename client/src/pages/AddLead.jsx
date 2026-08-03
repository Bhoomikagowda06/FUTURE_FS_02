import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddLead.css";

function AddLead() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Website",
        status: "New",
        followUpDate: "",
        notes: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const saveLead = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/leads/add", form);

            console.log(res.data);

            setMessage("✅ Lead Added Successfully");

            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                source: "Website",
                status: "New",
                followUpDate: "",
                notes: ""
            });

            setTimeout(() => {

                navigate("/leads");

            }, 1200);

        } catch (error) {

            console.log(error.response?.data || error.message);

            setMessage("❌ Failed to Add Lead");

        }

    };

    return (

        <div className="add-lead-page">

            <h1>Add New Lead</h1>

            <form onSubmit={saveLead}>

                <input
                    type="text"
                    name="name"
                    placeholder="Lead Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                />

                <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                >
                    <option value="Website">Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Walk-In">Walk-In</option>
                </select>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Converted">Converted</option>
                </select>

                <input
                    type="date"
                    name="followUpDate"
                    value={form.followUpDate}
                    onChange={handleChange}
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="4"
                />

                <button type="submit">
                    Save Lead
                </button>

            </form>

            {message && <p>{message}</p>}

        </div>

    );

}

export default AddLead;