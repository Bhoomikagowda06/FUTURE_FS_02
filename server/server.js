require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require("dns");
const connectDB = require("./config/db");




dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();



// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const activityRoutes = require("./routes/activityRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

console.log("userRoutes =", userRoutes);
app.use("/uploads", express.static("uploads"));


app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/orders",orderRoutes);
app.use(
    "/api/analytics",
    analyticsRoutes
);
app.use(
    "/api/products",
    productRoutes
);
// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Mini CRM Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});