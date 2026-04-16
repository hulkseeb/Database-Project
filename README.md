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
- **Repository link:** `https://github.com/<hulkseeb>/event-management`
- **Live site link:** `https://<hulkseeb>.github.io/event-management/`

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
