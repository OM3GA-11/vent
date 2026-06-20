const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const ventRoutes = require("./routes/ventRoutes");
const commentRoutes = require("./routes/commentRoutes");
const voteRoutes = require("./routes/voteRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Vent API running" });
});

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/vents", ventRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/users", userRoutes);

module.exports = app;