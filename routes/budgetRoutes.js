const express = require("express");
const router = express.Router();
const db = require("../db");

/* STUDENT ADD BUDGET */
router.post("/add", (req, res) => {
  const { student_name, event_name, budget_items, total_amount } = req.body;

  db.query(
    "INSERT INTO budgets (student_name,event_name,budget_items,total_amount,status) VALUES (?,?,?,?,?)",
    [student_name, event_name, budget_items, total_amount, "Pending"],
    err => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json({ message: "Budget Submitted" });
    }
  );
});

/* ADMIN VIEW ALL */
router.get("/all", (req, res) => {
  db.query("SELECT * FROM budgets", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

/* ADMIN UPDATE STATUS */
router.post("/status", (req, res) => {
  const { id, status } = req.body;
  db.query(
    "UPDATE budgets SET status=? WHERE id=?",
    [status, id],
    err => {
      if (err) return res.status(500).json({});
      res.json({ message: "Updated" });
    }
  );
});

/* STUDENT VIEW */
router.get("/student/:name", (req, res) => {
  db.query(
    "SELECT * FROM budgets WHERE student_name=?",
    [req.params.name],
    (err, result) => {
      if (err) return res.json([]);
      res.json(result);
    }
  );
});

module.exports = router;
