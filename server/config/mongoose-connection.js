require("dotenv").config(); // Load .env file
const mongoose = require("mongoose");

const mongoURL =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL_PRODUCTION // Use production URL in production mode
    : process.env.MONGODB_URL_LOCAL; // Use local URL in other environments

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB at ${mongoURL}`))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
