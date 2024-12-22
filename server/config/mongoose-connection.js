require("dotenv").config(); // Load .env file
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI ;

mongoose
  .connect(mongoURI) // No need for useNewUrlParser or useUnifiedTopology
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.error("MongoDB connection error:", err));
