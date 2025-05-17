const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
  })
);
app.use(express.json()); // for parsing JSON request bodies
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
