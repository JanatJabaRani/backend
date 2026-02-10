const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT name, role FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ success:false, message:"Server error" });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        name: result[0].name, //Janat very important
        role: result[0].role
      });
    } else {
      res.json({
        success:false,
        message:"Invalid Email or Password"
      });
    }
  });
});
module.exports = router;
