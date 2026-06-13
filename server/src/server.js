require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));


// console.log("Weather key:", process.env.OPENWEATHER_API_KEY);


connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
