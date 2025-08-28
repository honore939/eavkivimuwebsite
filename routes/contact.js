const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: kwakira ubutumwa bwo muri contact form
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Byuzuzwe byose (name, email, message)" });
  }

  const sql = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

module.exports = router;
