# EventHub — Event Management System

**Course:** CSE 311 LAB | **Section:** 05 | **Group:** 05

| Name | NSU ID |
|------|--------|
| Ahidul Hasan Dipu | 2412632042 |
| Sohail Kabir | 2413483042 |
| Abdullah Al Muhim | 2411992042 |

---

Demonstration
GitHub Pages URL: `https://<your-username>.github.io/event-management/`

---

Project Structure

```
event-management/
├── index.html              ← Dashboard / Home
├── css/
│   └── style.css           ← All styles
├── js/
│   └── database.js         ← In-browser database (mirrors MySQL schema)
├── pages/
│   ├── events.html         ← Events listing + detail modal
│   ├── participants.html   ← Participants table + modal
│   ├── organizers.html     ← Organizer cards + modal
│   ├── venues.html         ← Venues table + modal
│   └── registrations.html ← Registrations table with filters
├── event_management.sql    ← MySQL schema + sample data
└── README.md
```

---

Why No PHP / MySQL on GitHub Pages?

GitHub Pages is a **static hosting** service — it only serves HTML, CSS, and JavaScript files.
It does **not** support:
- Server-side languages like PHP, Python, Node.js
- Database connections (MySQL, PostgreSQL, etc.)

### Our Solution
All database data from the MySQL schema is mirrored inside `js/database.js` as JavaScript arrays and objects. The UI reads and queries this data entirely in the browser — giving the same experience as a live database-connected app. In a real production deployment, `js/database.js` would be replaced with `fetch()` calls to a REST API or a service like Supabase/Firebase.

---

## 🚀 GitHub Pages Deployment — Step by Step

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Click **New repository**
3. Name it `event-management`
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Push all files
Open a terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: EventHub - NSU Event Management System"
git branch -M main
git remote add origin https://github.com/<your-username>/event-management.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → scroll to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

### Step 4 — Get your live link
After ~60 seconds, your site will be live at:
```
https://<your-username>.github.io/event-management/
```

Submit both:
- **Repository link:** `https://github.com/<your-username>/event-management`
- **Live site link:** `https://<your-username>.github.io/event-management/`

---

Database Schema (MySQL)

Refer to `event_management.sql` for the full schema. Tables:

| Table | Description |
|-------|-------------|
| `VENUE` | Stores venue details |
| `EVENT` | Events with FK to VENUE |
| `PARTICIPANT` | Registered participants |
| `ORGANIZER` | Event organizers |
| `REGISTRATION` | Junction: Participant ↔ Event |
| `EVENT_ORGANIZER` | Junction: Organizer ↔ Event (M:N) |

---

Features

- Dashboard with live statistics
- Events browser with search & venue filter + detail modal
- Participants table with search + event history modal
- Organizers grid with assigned events modal
- Venues table with hosted events modal
- Registrations table with status & event filters
- Fully responsive — works on mobile
