const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/navigation", require("./routes/navigationRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));

/* 🔐 LOGIN API */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      const user = result[0];
      res.json({
        success: true,
        role: user.role,
        name: user.name
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password"
      });
    }
  });
});
 app.get("/", (req, res) => {
  res.send("Backend running OK 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
