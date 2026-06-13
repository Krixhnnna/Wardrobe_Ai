const path = require("path");

// Load local environment variables if developing locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../server/.env") });
}

const app = require("../server/src/app");
const connectDB = require("../server/src/config/db");

// Establish connection to MongoDB Atlas or local DB (using connection caching in Mongoose)
connectDB();

module.exports = app;
