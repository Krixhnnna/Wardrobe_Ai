const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const clothesRoutes = require("./routes/clothes.routes");
const outfitRoutes = require("./routes/outfit.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Wardrobe AI backend running" });
});

app.get("/test-weather", async (req, res) => {
  const { getWeather } = require("./services/weather.service");
  try {
    const data = await getWeather("London");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use("/api/clothes", clothesRoutes);
app.use("/api/outfits", outfitRoutes);

module.exports = app;