const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Middleware for logging HTTP requests
app.use(morgan("combined"));

// Custom middleware (important for ELK visibility)
app.use((req, res, next) => {
  console.log(`[CUSTOM LOG] ${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.send("Hello from Node API 🚀");
});

app.get("/error", (req, res) => {
  console.error("Simulated error occurred ❌");
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/logs", (req, res) => {
  console.log("Generating multiple logs...");
  for (let i = 0; i < 5; i++) {
    console.log(`Log number ${i}`);
  }
  res.send("Logs generated ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});