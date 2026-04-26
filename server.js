// ============================================================
// EventHub — Backend Server
// Course: CSE 311 LAB | Section: 05 | Group: 05
// Run: node server.js
// ============================================================

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));   // serve all HTML/CSS/JS files from same folder

// ── DB CONNECTION ──────────────────────────────────────────
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // change if your MySQL username is different
  password: '',        // change to your MySQL password
  database: 'event_management'
});

db.connect(err => {
  if (err) {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    Make sure MySQL is running and credentials are correct in server.js');
    process.exit(1);
  }
  console.log('✅  Connected to MySQL — event_management database');
  console.log('🚀  Server running at http://localhost:3000');
});

// ── HELPER ────────────────────────────────────────────────
const run = (res, sql, params = []) => {
  db.query(sql, params, (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ error: err.message }); }
    res.json(results);
  });
};

// ===========================================================
//  EVENTS  (full CRUD)
// ===========================================================
app.get('/api/events', (req, res) => {
  run(res, `
    SELECT e.*, v.venue_name, v.location
    FROM EVENT e
    JOIN VENUE v ON e.venue_id = v.venue_id
    ORDER BY e.event_date
  `);
});

app.get('/api/events/:id', (req, res) => {
  run(res,
    `SELECT e.*, v.venue_name FROM EVENT e JOIN VENUE v ON e.venue_id=v.venue_id WHERE e.event_id=?`,
    [req.params.id]
  );
});

app.post('/api/events', (req, res) => {
  const { event_name, event_date, event_time, description, venue_id } = req.body;
  run(res,
    `INSERT INTO EVENT (event_name, event_date, event_time, description, venue_id) VALUES (?,?,?,?,?)`,
    [event_name, event_date, event_time, description, venue_id]
  );
});

app.put('/api/events/:id', (req, res) => {
  const { event_name, event_date, event_time, description, venue_id } = req.body;
  run(res,
    `UPDATE EVENT SET event_name=?, event_date=?, event_time=?, description=?, venue_id=? WHERE event_id=?`,
    [event_name, event_date, event_time, description, venue_id, req.params.id]
  );
});

app.delete('/api/events/:id', (req, res) => {
  run(res, `DELETE FROM EVENT WHERE event_id=?`, [req.params.id]);
});

// ===========================================================
//  PARTICIPANTS  (full CRUD)
// ===========================================================
app.get('/api/participants', (req, res) => {
  run(res, `SELECT * FROM PARTICIPANT ORDER BY participant_id`);
});

app.get('/api/participants/:id', (req, res) => {
  run(res, `SELECT * FROM PARTICIPANT WHERE participant_id=?`, [req.params.id]);
});

app.post('/api/participants', (req, res) => {
  const { name, email, phone, address } = req.body;
  run(res,
    `INSERT INTO PARTICIPANT (name, email, phone, address) VALUES (?,?,?,?)`,
    [name, email, phone, address]
  );
});

app.put('/api/participants/:id', (req, res) => {
  const { name, email, phone, address } = req.body;
  run(res,
    `UPDATE PARTICIPANT SET name=?, email=?, phone=?, address=? WHERE participant_id=?`,
    [name, email, phone, address, req.params.id]
  );
});

app.delete('/api/participants/:id', (req, res) => {
  run(res, `DELETE FROM PARTICIPANT WHERE participant_id=?`, [req.params.id]);
});

// ===========================================================
//  ORGANIZERS  (full CRUD)
// ===========================================================
app.get('/api/organizers', (req, res) => {
  run(res, `SELECT * FROM ORGANIZER ORDER BY organizer_id`);
});

app.get('/api/organizers/:id', (req, res) => {
  run(res, `SELECT * FROM ORGANIZER WHERE organizer_id=?`, [req.params.id]);
});

app.post('/api/organizers', (req, res) => {
  const { name, email, phone, role } = req.body;
  run(res,
    `INSERT INTO ORGANIZER (name, email, phone, role) VALUES (?,?,?,?)`,
    [name, email, phone, role]
  );
});

app.put('/api/organizers/:id', (req, res) => {
  const { name, email, phone, role } = req.body;
  run(res,
    `UPDATE ORGANIZER SET name=?, email=?, phone=?, role=? WHERE organizer_id=?`,
    [name, email, phone, role, req.params.id]
  );
});

app.delete('/api/organizers/:id', (req, res) => {
  run(res, `DELETE FROM ORGANIZER WHERE organizer_id=?`, [req.params.id]);
});

// ===========================================================
//  VENUES  (full CRUD)
// ===========================================================
app.get('/api/venues', (req, res) => {
  run(res, `SELECT * FROM VENUE ORDER BY venue_id`);
});

app.get('/api/venues/:id', (req, res) => {
  run(res, `SELECT * FROM VENUE WHERE venue_id=?`, [req.params.id]);
});

app.post('/api/venues', (req, res) => {
  const { venue_name, location, capacity, description } = req.body;
  run(res,
    `INSERT INTO VENUE (venue_name, location, capacity, description) VALUES (?,?,?,?)`,
    [venue_name, location, capacity, description]
  );
});

app.put('/api/venues/:id', (req, res) => {
  const { venue_name, location, capacity, description } = req.body;
  run(res,
    `UPDATE VENUE SET venue_name=?, location=?, capacity=?, description=? WHERE venue_id=?`,
    [venue_name, location, capacity, description, req.params.id]
  );
});

app.delete('/api/venues/:id', (req, res) => {
  run(res, `DELETE FROM VENUE WHERE venue_id=?`, [req.params.id]);
});

// ===========================================================
//  REGISTRATIONS  (full CRUD)
// ===========================================================
app.get('/api/registrations', (req, res) => {
  run(res, `
    SELECT r.*, p.name AS participant_name, e.event_name
    FROM REGISTRATION r
    JOIN PARTICIPANT p ON r.participant_id = p.participant_id
    JOIN EVENT e ON r.event_id = e.event_id
    ORDER BY r.reg_id
  `);
});

app.get('/api/registrations/:id', (req, res) => {
  run(res, `SELECT * FROM REGISTRATION WHERE reg_id=?`, [req.params.id]);
});

app.post('/api/registrations', (req, res) => {
  const { event_id, participant_id, status } = req.body;
  run(res,
    `INSERT INTO REGISTRATION (event_id, participant_id, status) VALUES (?,?,?)`,
    [event_id, participant_id, status || 'Pending']
  );
});

app.put('/api/registrations/:id', (req, res) => {
  const { event_id, participant_id, status } = req.body;
  run(res,
    `UPDATE REGISTRATION SET event_id=?, participant_id=?, status=? WHERE reg_id=?`,
    [event_id, participant_id, status, req.params.id]
  );
});

app.delete('/api/registrations/:id', (req, res) => {
  run(res, `DELETE FROM REGISTRATION WHERE reg_id=?`, [req.params.id]);
});

// ===========================================================
//  Start Server
// ===========================================================
app.listen(3000, () => {
  console.log('');
  console.log('  Open your browser and go to: http://localhost:3000');
  console.log('');
});
