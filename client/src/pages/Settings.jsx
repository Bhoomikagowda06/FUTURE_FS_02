import "./Settings.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useState } from "react";

export default function Settings() {

  const [form, setForm] = useState({
    name: "Bhoomika H S",
    email: "admin@crm.com",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="settings-page">

        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings</p>
        </div>

        <div className="profile-section">

          <img
            src="/profile.jpg"
            alt="Profile"
            className="profile-image"
          />

          <h2>{form.name}</h2>

          <p>{form.email}</p>

        </div>

        <form
          className="settings-card"
          onSubmit={handleSubmit}
        >

          <h2>Profile Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <h2>Change Password</h2>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="save-btn"
          >
            Save Changes
          </button>

        </form>

      </div>
    </>
  );
}