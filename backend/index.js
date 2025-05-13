const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
  })
);
app.use(express.json()); // for parsing JSON request bodies
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
