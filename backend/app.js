require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const courseRoutes = require("./src/routes/courseRoutes");
const Expendituer = require("./src/routes/Expenditure");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/courses", courseRoutes);
app.use("/", Expendituer);
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://deepaksj157:7R83h0NGMFvuXv5R@cluster0.ytmvsqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

app.get("/testing", (req, res, next) => {
  res.send("hello world");
});
