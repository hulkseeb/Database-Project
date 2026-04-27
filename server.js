const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================
// DATABASE CONNECTION
// ==========================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_management"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

// ==========================
// PRIMARY KEYS
// ==========================
const primaryKeys = {
  VENUE: "venue_id",
  EVENT: "event_id",
  PARTICIPANT: "participant_id",
  ORGANIZER: "organizer_id",
  TICKET: "ticket_id",
  REGISTRATION: "reg_id",
  PAYMENT: "payment_id",
  EVENT_SCHEDULE: "schedule_id",
  EVENT_ORGANIZER: null // composite
};

// ==========================
// ALLOWED TABLES
// ==========================
const allowedTables = Object.keys(primaryKeys);

// ==========================
// VALIDATE TABLE
// ==========================
function validateTable(table, res) {
  if (!allowedTables.includes(table)) {
    res.status(400).json({ success: false, message: "Invalid table" });
    return false;
  }
  return true;
}

// ==========================
// CREATE
// ==========================
app.post("/api/:table", (req, res) => {
  const table = req.params.table.toUpperCase();
  if (!validateTable(table, res)) return;

  db.query(`INSERT INTO ${table} SET ?`, req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true, data: result });
  });
});

// ==========================
// READ ALL
// ==========================
app.get("/api/:table", (req, res) => {
  const table = req.params.table.toUpperCase();
  if (!validateTable(table, res)) return;

  db.query(`SELECT * FROM ${table}`, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true, data: result });
  });
});

// ==========================
// UPDATE (GENERIC)
// ==========================
app.put("/api/:table/:id", (req, res) => {
  const table = req.params.table.toUpperCase();
  const id = req.params.id;
  const data = req.body;

  if (!validateTable(table, res)) return;

  const key = primaryKeys[table];

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Use custom route for composite key table"
    });
  }

  db.query(
    `UPDATE ${table} SET ? WHERE ${key}=?`,
    [data, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// ==========================
// DELETE (GENERIC)
// ==========================
app.delete("/api/:table/:id", (req, res) => {
  const table = req.params.table.toUpperCase();
  const id = req.params.id;

  if (!validateTable(table, res)) return;

  const key = primaryKeys[table];

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Use custom route for composite key table"
    });
  }

  db.query(
    `DELETE FROM ${table} WHERE ${key}=?`,
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});


// =====================================================
// 🔥 EVENT_ORGANIZER (SPECIAL - COMPOSITE KEY)
// =====================================================

// READ
app.get("/api/EVENT_ORGANIZER", (req, res) => {
  db.query("SELECT * FROM EVENT_ORGANIZER", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ data: result });
  });
});

// CREATE
app.post("/api/EVENT_ORGANIZER", (req, res) => {
  const { event_id, organizer_id, assigned_role, assignment_date } = req.body;

  db.query(
    `INSERT INTO EVENT_ORGANIZER 
     (event_id, organizer_id, assigned_role, assignment_date)
     VALUES (?, ?, ?, ?)`,
    [event_id, organizer_id, assigned_role, assignment_date],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// UPDATE
app.put("/api/EVENT_ORGANIZER", (req, res) => {
  const { event_id, organizer_id, assigned_role, assignment_date } = req.body;

  db.query(
    `UPDATE EVENT_ORGANIZER 
     SET assigned_role=?, assignment_date=? 
     WHERE event_id=? AND organizer_id=?`,
    [assigned_role, assignment_date, event_id, organizer_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// DELETE
app.delete("/api/EVENT_ORGANIZER", (req, res) => {
  const { event_id, organizer_id } = req.body;

  db.query(
    `DELETE FROM EVENT_ORGANIZER 
     WHERE event_id=? AND organizer_id=?`,
    [event_id, organizer_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});


// ==========================
// START SERVER
// ==========================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
