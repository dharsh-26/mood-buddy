const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./configs/db");

const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plan");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
console.log("Plan route loaded ");


app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Handle Invalid Routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
