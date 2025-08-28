const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: kwakira kwiyandikisha
router.post('/', (req, res) => {
  const { fullName, email, program, phone } = req.body;

  if (!fullName || !email || !program) {
    return res.status(400).json({ error: "Byuzuzwe byose (name, email, program)" });
  }

  const sql = "INSERT INTO admissions (fullName, email, program, phone) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, program, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

module.exports = router;
