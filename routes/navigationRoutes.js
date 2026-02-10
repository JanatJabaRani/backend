const express = require("express");
const router = express.Router();
const db = require("../db");

/* Admin add location */
router.post("/add", (req, res) => {
  const { location_name, path_details } = req.body;

  const sql =
    "INSERT INTO navigation (location_name, path_details) VALUES (?, ?)";

  db.query(sql, [location_name, path_details], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json({ message: "Location added successfully" });
  });
});

/* Student fetch all locations */
router.get("/all", (req, res) => {
  db.query("SELECT * FROM navigation", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
