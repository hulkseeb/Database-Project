// ============================================================
// EventHub — Backend Server (SQLite version — no MySQL needed)
// Course: CSE 311 LAB | Section: 05 | Group: 05
// Run: node server.js
// ============================================================

const express    = require('express');
const cors       = require('cors');
const Database   = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// ── CREATE / OPEN DATABASE ────────────────────────────────
const db = new Database('eventhub.db');
console.log('✅  SQLite database ready (eventhub.db)');

// ── CREATE TABLES IF THEY DON'T EXIST ────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS VENUE (
    venue_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_name  TEXT    NOT NULL,
    location    TEXT    NOT NULL,
    capacity    INTEGER NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS EVENT (
    event_id    INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name  TEXT    NOT NULL,
    event_date  TEXT    NOT NULL,
    event_time  TEXT    NOT NULL,
    description TEXT,
    venue_id    INTEGER,
    FOREIGN KEY (venue_id) REFERENCES VENUE(venue_id)
  );

  CREATE TABLE IF NOT EXISTS PARTICIPANT (
    participant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE,
    phone          TEXT,
    address        TEXT
  );

  CREATE TABLE IF NOT EXISTS ORGANIZER (
    organizer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    role         TEXT
  );

  CREATE TABLE IF NOT EXISTS REGISTRATION (
    reg_id            INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id          INTEGER NOT NULL,
    participant_id    INTEGER NOT NULL,
    registration_date TEXT DEFAULT (date('now')),
    status            TEXT DEFAULT 'Pending',
    FOREIGN KEY (event_id)       REFERENCES EVENT(event_id),
    FOREIGN KEY (participant_id) REFERENCES PARTICIPANT(participant_id),
    UNIQUE(event_id, participant_id)
  );
`);

// ── SEED SAMPLE DATA IF EMPTY ─────────────────────────────
const venueCount = db.prepare('SELECT COUNT(*) as c FROM VENUE').get().c;
if (venueCount === 0) {
  db.exec(`
    INSERT INTO VENUE (venue_name, location, capacity, description) VALUES
      ('NSU Auditorium',     'Bashundhara, Dhaka',    800, 'Main university auditorium with full AV setup'),
      ('Convention Center',  'Gulshan, Dhaka',       1200, 'Large convention hall for major events'),
      ('IT Building Hall',   'NSU Campus, Dhaka',     300, 'Technology-focused event space'),
      ('Sports Complex',     'NSU Campus, Dhaka',     500, 'Indoor sports and event venue'),
      ('Business Faculty',   'NSU Campus, Dhaka',     200, 'Seminar and business event hall');

    INSERT INTO EVENT (event_name, event_date, event_time, description, venue_id) VALUES
      ('NSU TechFest 2026',         '2026-05-10', '09:00', 'Annual technology festival showcasing student innovations', 1),
      ('Cultural Night 2026',       '2026-05-15', '18:00', 'A celebration of culture, music and arts', 2),
      ('Business Summit',           '2026-05-20', '10:00', 'Annual business and entrepreneurship summit', 5),
      ('Cybersecurity Workshop',    '2026-06-01', '14:00', 'Hands-on cybersecurity training session', 3),
      ('AI & ML Conference',        '2026-06-10', '09:30', 'Conference on Artificial Intelligence and Machine Learning', 1);

    INSERT INTO PARTICIPANT (name, email, phone, address) VALUES
      ('Rahim Uddin',     'rahim@example.com',   '01711-000001', 'Mirpur, Dhaka'),
      ('Karim Hossain',   'karim@example.com',   '01711-000002', 'Dhanmondi, Dhaka'),
      ('Sumaiya Begum',   'sumaiya@example.com', '01811-000003', 'Uttara, Dhaka'),
      ('Tanvir Ahmed',    'tanvir@example.com',  '01911-000004', 'Gulshan, Dhaka'),
      ('Nadia Islam',     'nadia@example.com',   '01611-000005', 'Banani, Dhaka');

    INSERT INTO ORGANIZER (name, email, phone, role) VALUES
      ('Ahidul Hasan Dipu', 'dipu@nsu.edu.bd',   '01811-111001', 'Manager'),
      ('Sohail Kabir',      'sohail@nsu.edu.bd', '01811-111002', 'Coordinator'),
      ('Abdullah Al Muhim', 'muhim@nsu.edu.bd',  '01811-111003', 'Logistics');

    INSERT INTO REGISTRATION (event_id, participant_id, status) VALUES
      (1, 1, 'Confirmed'),
      (1, 2, 'Confirmed'),
      (1, 3, 'Pending'),
      (2, 4, 'Confirmed'),
      (2, 5, 'Pending'),
      (3, 1, 'Confirmed'),
      (4, 2, 'Cancelled'),
      (5, 3, 'Confirmed');
  `);
  console.log('✅  Sample data inserted');
}

// ===========================================================
//  VENUES
// ===========================================================
app.get('/api/venues', (req, res) => res.json(db.prepare('SELECT * FROM VENUE ORDER BY venue_id').all()));
app.get('/api/venues/:id', (req, res) => { const r=db.prepare('SELECT * FROM VENUE WHERE venue_id=?').get(req.params.id); r?res.json(r):res.status(404).json({error:'Not found'}); });
app.post('/api/venues', (req, res) => { try { const {venue_name,location,capacity,description}=req.body; const r=db.prepare('INSERT INTO VENUE (venue_name,location,capacity,description) VALUES (?,?,?,?)').run(venue_name,location,capacity,description); res.json({venue_id:r.lastInsertRowid}); } catch(e){res.status(500).json({error:e.message});} });
app.put('/api/venues/:id', (req, res) => { try { const {venue_name,location,capacity,description}=req.body; db.prepare('UPDATE VENUE SET venue_name=?,location=?,capacity=?,description=? WHERE venue_id=?').run(venue_name,location,capacity,description,req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });
app.delete('/api/venues/:id', (req, res) => { try { db.prepare('DELETE FROM VENUE WHERE venue_id=?').run(req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });

// ===========================================================
//  EVENTS
// ===========================================================
app.get('/api/events', (req, res) => res.json(db.prepare('SELECT e.*, v.venue_name, v.location FROM EVENT e JOIN VENUE v ON e.venue_id=v.venue_id ORDER BY e.event_date').all()));
app.get('/api/events/:id', (req, res) => { const r=db.prepare('SELECT * FROM EVENT WHERE event_id=?').get(req.params.id); r?res.json(r):res.status(404).json({error:'Not found'}); });
app.post('/api/events', (req, res) => { try { const {event_name,event_date,event_time,description,venue_id}=req.body; const r=db.prepare('INSERT INTO EVENT (event_name,event_date,event_time,description,venue_id) VALUES (?,?,?,?,?)').run(event_name,event_date,event_time,description,venue_id); res.json({event_id:r.lastInsertRowid}); } catch(e){res.status(500).json({error:e.message});} });
app.put('/api/events/:id', (req, res) => { try { const {event_name,event_date,event_time,description,venue_id}=req.body; db.prepare('UPDATE EVENT SET event_name=?,event_date=?,event_time=?,description=?,venue_id=? WHERE event_id=?').run(event_name,event_date,event_time,description,venue_id,req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });
app.delete('/api/events/:id', (req, res) => { try { db.prepare('DELETE FROM REGISTRATION WHERE event_id=?').run(req.params.id); db.prepare('DELETE FROM EVENT WHERE event_id=?').run(req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });

// ===========================================================
//  PARTICIPANTS
// ===========================================================
app.get('/api/participants', (req, res) => res.json(db.prepare('SELECT * FROM PARTICIPANT ORDER BY participant_id').all()));
app.get('/api/participants/:id', (req, res) => { const r=db.prepare('SELECT * FROM PARTICIPANT WHERE participant_id=?').get(req.params.id); r?res.json(r):res.status(404).json({error:'Not found'}); });
app.post('/api/participants', (req, res) => { try { const {name,email,phone,address}=req.body; const r=db.prepare('INSERT INTO PARTICIPANT (name,email,phone,address) VALUES (?,?,?,?)').run(name,email,phone,address); res.json({participant_id:r.lastInsertRowid}); } catch(e){res.status(500).json({error:e.message});} });
app.put('/api/participants/:id', (req, res) => { try { const {name,email,phone,address}=req.body; db.prepare('UPDATE PARTICIPANT SET name=?,email=?,phone=?,address=? WHERE participant_id=?').run(name,email,phone,address,req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });
app.delete('/api/participants/:id', (req, res) => { try { db.prepare('DELETE FROM REGISTRATION WHERE participant_id=?').run(req.params.id); db.prepare('DELETE FROM PARTICIPANT WHERE participant_id=?').run(req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });

// ===========================================================
//  ORGANIZERS
// ===========================================================
app.get('/api/organizers', (req, res) => res.json(db.prepare('SELECT * FROM ORGANIZER ORDER BY organizer_id').all()));
app.get('/api/organizers/:id', (req, res) => { const r=db.prepare('SELECT * FROM ORGANIZER WHERE organizer_id=?').get(req.params.id); r?res.json(r):res.status(404).json({error:'Not found'}); });
app.post('/api/organizers', (req, res) => { try { const {name,email,phone,role}=req.body; const r=db.prepare('INSERT INTO ORGANIZER (name,email,phone,role) VALUES (?,?,?,?)').run(name,email,phone,role); res.json({organizer_id:r.lastInsertRowid}); } catch(e){res.status(500).json({error:e.message});} });
app.put('/api/organizers/:id', (req, res) => { try { const {name,email,phone,role}=req.body; db.prepare('UPDATE ORGANIZER SET name=?,email=?,phone=?,role=? WHERE organizer_id=?').run(name,email,phone,role,req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });
app.delete('/api/organizers/:id', (req, res) => { try { db.prepare('DELETE FROM ORGANIZER WHERE organizer_id=?').run(req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });

// ===========================================================
//  REGISTRATIONS
// ===========================================================
app.get('/api/registrations', (req, res) => res.json(db.prepare('SELECT r.*, p.name AS participant_name, e.event_name FROM REGISTRATION r JOIN PARTICIPANT p ON r.participant_id=p.participant_id JOIN EVENT e ON r.event_id=e.event_id ORDER BY r.reg_id').all()));
app.get('/api/registrations/:id', (req, res) => { const r=db.prepare('SELECT * FROM REGISTRATION WHERE reg_id=?').get(req.params.id); r?res.json(r):res.status(404).json({error:'Not found'}); });
app.post('/api/registrations', (req, res) => { try { const {event_id,participant_id,status}=req.body; const r=db.prepare('INSERT INTO REGISTRATION (event_id,participant_id,status) VALUES (?,?,?)').run(event_id,participant_id,status||'Pending'); res.json({reg_id:r.lastInsertRowid}); } catch(e){ if(e.message.includes('UNIQUE')) return res.status(400).json({error:'Already registered'}); res.status(500).json({error:e.message}); } });
app.put('/api/registrations/:id', (req, res) => { try { const {event_id,participant_id,status}=req.body; db.prepare('UPDATE REGISTRATION SET event_id=?,participant_id=?,status=? WHERE reg_id=?').run(event_id,participant_id,status,req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });
app.delete('/api/registrations/:id', (req, res) => { try { db.prepare('DELETE FROM REGISTRATION WHERE reg_id=?').run(req.params.id); res.json({success:true}); } catch(e){res.status(500).json({error:e.message});} });

// ===========================================================
//  Start
// ===========================================================
app.listen(3000, () => {
  console.log('');
  console.log('  ✅  Open your browser: http://localhost:3000');
  console.log('');
});
