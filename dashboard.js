// ==========================
// BASE API
// ==========================
const API = "http://localhost:3000/api";

// ==========================
// DASHBOARD LOADER
// ==========================
async function loadDashboard() {
    try {
        const [eventsRes, participantsRes, venuesRes, registrationsRes] =
            await Promise.all([
                fetch(`${API}/EVENT`).then(res => res.json()),
                fetch(`${API}/PARTICIPANT`).then(res => res.json()),
                fetch(`${API}/VENUE`).then(res => res.json()),
                fetch(`${API}/REGISTRATION`).then(res => res.json())
            ]);

        const events = eventsRes.data;
        const participants = participantsRes.data;
        const venues = venuesRes.data;
        const registrations = registrationsRes.data;

        document.getElementById("totalEvents").innerText = events.length;
        document.getElementById("totalParticipants").innerText = participants.length;
        document.getElementById("totalVenues").innerText = venues.length;
        document.getElementById("totalRegistrations").innerText = registrations.length;

        const activityList = document.getElementById("activityList");
        if (!activityList) return;

        activityList.innerHTML = "";

        const activities = [];

        events.slice(-2).forEach(e =>
            activities.push(`Event created: ${e.event_name}`)
        );

        participants.slice(-2).forEach(p =>
            activities.push(`New participant: ${p.name}`)
        );

        registrations.slice(-2).forEach(r =>
            activities.push(`Registration ID ${r.reg_id} added`)
        );

        venues.slice(-1).forEach(v =>
            activities.push(`Venue available: ${v.venue_name}`)
        );

        activities.forEach(text => {
            const li = document.createElement("li");
            li.innerText = text;
            activityList.appendChild(li);
        });

    } catch (err) {
        console.error(err);
    }
}

// ==========================
// AUTO LOAD SAFELY
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const dashboardExists =
        document.getElementById("totalEvents") ||
        document.getElementById("activityList");

    if (dashboardExists) {
        loadDashboard();
    }
});
