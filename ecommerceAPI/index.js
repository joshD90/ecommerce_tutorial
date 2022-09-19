require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((e) => console.log(e));

//Routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(`Server is listening on Port 5000`);
});
