const express = require("express");
const router = express.Router();
const db = require("../db");

/* =======================
   STUDENT ADD BOOKING
======================= */
router.post("/student/add", (req,res)=>{
  const {
    student_name,
    event_name,
    hall,
    event_date,
    start_time,
    end_time,
    attendance,
    purpose
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (student_name,event_name,hall,event_date,start_time,end_time,attendance,purpose,status)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [student_name,event_name,hall,event_date,start_time,end_time,attendance,purpose,"Pending"],
    (err)=>{
      if(err){
        console.log(err);
        return res.status(500).json({message:"DB Error"});
      }
      res.json({message:"Booking Submitted & Waiting for Approval"});
    }
  );
});

/* =======================
   ADMIN VIEW ALL BOOKINGS
======================= */
router.get("/all", (req,res)=>{
  db.query("SELECT * FROM bookings", (err,result)=>{
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});

/* =======================
   ADMIN APPROVE / REJECTUPDATE STATUS
======================= */
router.post("/admin/status", (req,res)=>{
  const { id, status } = req.body;

  const sql = "UPDATE bookings SET status=? WHERE id=?";
  db.query(sql, [status, id], err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Update failed" });
    }
    res.json({ message: "Status updated" });
    }
  );
});

/* =======================
   STUDENT VIEW STATUS
======================= */
router.get("/student/:name", (req,res)=>{

  const sql = `
    SELECT event_name, hall, event_date, status
    FROM bookings
    WHERE student_name=?
  `;
db.query(sql, [req.params.name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
