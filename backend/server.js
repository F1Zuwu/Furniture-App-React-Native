const express = require("express");
const path = require("path");
const corsHandler = require('./middleware/cors');
const projectRouter = require("./routes/projectRouter");
const rateLimit = require("express-rate-limit")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve locally uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 125,              // max 100 requests per window per IP
  standardHeaders: true,   // adds RateLimit-* headers
  legacyHeaders: false,    // disables X-RateLimit-* headers
  message: { error: "You have made too many requests, please try again later." },
});

// Rate limiting
app.use("/api", limiter);

// Routes
app.use("/services", projectRouter);

const PORT = Number(process.env.PORT) || 3015;

const server = app.listen(PORT, () => {
  console.log(`👍 | http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other server or set PORT to a different value.`);
    process.exit(1);
  }
  throw err;
});

module.exports = app