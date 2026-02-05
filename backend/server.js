const timeRoutes = require("./routes/timeRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.use("/api/time", timeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
