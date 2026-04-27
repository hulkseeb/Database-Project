// ==========================
// BASE API
// ==========================
const API = "http://localhost:3000/api";

// ==========================
// LOAD EVENTS (READ)
// ==========================

function loadEvents() {
    fetch(`${API}/EVENT`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("eventTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(e => {
                table.innerHTML += `
                    <tr>
                        <td>${e.event_id}</td>
                        <td>${e.event_name}</td>
                        <td>${formatDateSafe(e.event_date)}</td>
                        <td>${e.event_time}</td>
                        <td>${e.description}</td>
                        <td>${e.venue_id}</td>
                        <td>
                            <button onclick='editEvent(${JSON.stringify(e)})'>Edit</button>
                            <button onclick='deleteEvent(${e.event_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// ==========================
// CREATE EVENT
// ==========================
document.getElementById("eventForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/EVENT`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: document.getElementById("event_name").value,
      event_date: document.getElementById("event_date").value,
      event_time: document.getElementById("event_time").value,
      description: document.getElementById("description").value,
      venue_id: document.getElementById("venue_id").value
    })
  }).then(() => {
    loadEvents();
    document.getElementById("eventForm").reset();
  });
});

// ==========================
// DELETE EVENT
// ==========================
function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    fetch(`${API}/EVENT/${id}`, {
        method: "DELETE"
    })
    .then(() => loadEvents());
}

// ==========================
// UPDATE EVENT
// ==========================
function editEvent(e) {
    const newName = prompt("Event name:", e.event_name);
    const newDate = prompt("Event date:", e.event_date);
    const newTime = prompt("Event time:", e.event_time);
    const newDescription = prompt("Description:", e.description);
    const newVenue = prompt("Venue ID:", e.venue_id);

    if (!newName || !newDate || !newTime || !newDescription || !newVenue) return;

    fetch(`${API}/EVENT/${e.event_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event_name: newName,
            event_date: newDate,
            event_time: newTime,
            description: newDescription,
            venue_id: newVenue
        })
    }).then(() => loadEvents());
}

function loadVenues() {
    fetch(`${API}/VENUE`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("venueTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(v => {
                table.innerHTML += `
                    <tr>
                        <td>${v.venue_id}</td>
                        <td>${v.venue_name}</td>
                        <td>${v.location}</td>
                        <td>${v.capacity}</td>
                        <td>${v.description}</td>
                        <td>
                            <button onclick='editVenue(${JSON.stringify(v)})'>Edit</button>
                            <button onclick='deleteVenue(${v.venue_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("venueForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/VENUE`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      venue_name: document.getElementById("venue_name").value,
      location: document.getElementById("location").value,
      capacity: document.getElementById("capacity").value,
      description: document.getElementById("description").value
    })
  }).then(() => loadVenues());
});

// DELETE
function deleteVenue(id) {
    if (!confirm("Delete this venue?")) return;

    fetch(`${API}/VENUE/${id}`, {
        method: "DELETE"
    }).then(() => loadVenues());
}

// EDIT
function editVenue(v) {
    const name = prompt("Venue Name:", v.venue_name);
    const location = prompt("Location:", v.location);
    const capacity = prompt("Capacity:", v.capacity);
    const desc = prompt("Description:", v.description);

    if (!name || !location || !capacity) return;

    fetch(`${API}/VENUE/${v.venue_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            venue_name: name,
            location: location,
            capacity: capacity,
            description: desc
        })
    }).then(() => loadVenues());
}
function loadParticipants() {
    fetch(`${API}/PARTICIPANT`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("participantTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.participant_id}</td>
                        <td>${p.name}</td>
                        <td>${p.email}</td>
                        <td>${p.phone || ""}</td>
                        <td>${p.address || ""}</td>
                        <td>
                            <button onclick='editParticipant(${JSON.stringify(p)})'>Edit</button>
                            <button onclick='deleteParticipant(${p.participant_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("participantForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/PARTICIPANT`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value
    })
  }).then(() => loadParticipants());
});

// DELETE
function deleteParticipant(id) {
    if (!confirm("Delete this participant?")) return;

    fetch(`${API}/PARTICIPANT/${id}`, {
        method: "DELETE"
    }).then(() => loadParticipants());
}

// EDIT
function editParticipant(p) {
    const name = prompt("Name:", p.name);
    const email = prompt("Email:", p.email);
    const phone = prompt("Phone:", p.phone);
    const address = prompt("Address:", p.address);

    if (!name || !email) return;

    fetch(`${API}/PARTICIPANT/${p.participant_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            phone,
            address
        })
    }).then(() => loadParticipants());
}
function loadOrganizers() {
    fetch(`${API}/ORGANIZER`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("organizerTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(o => {
                table.innerHTML += `
                    <tr>
                        <td>${o.organizer_id}</td>
                        <td>${o.name}</td>
                        <td>${o.email}</td>
                        <td>${o.phone}</td>
                        <td>
                            <button onclick='editOrganizer(${JSON.stringify(o)})'>Edit</button>
                            <button onclick='deleteOrganizer(${o.organizer_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("organizerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/ORGANIZER`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: org_name.value,
      email: org_email.value,
      phone: org_phone.value
    })
  }).then(() => loadOrganizers());
});

// DELETE
function deleteOrganizer(id) {
    if (!confirm("Delete this organizer?")) return;

    fetch(`${API}/ORGANIZER/${id}`, {
        method: "DELETE"
    }).then(() => loadOrganizers());
}

// EDIT
function editOrganizer(o) {
    const name = prompt("Name:", o.name);
    const email = prompt("Email:", o.email);
    const phone = prompt("Phone:", o.phone);

    if (!name || !email) return;

    fetch(`${API}/ORGANIZER/${o.organizer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            phone
        })
    }).then(() => loadOrganizers());
}
function loadTickets() {
    fetch(`${API}/TICKET`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("ticketTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(x => {
                table.innerHTML += `
                    <tr>
                        <td>${x.ticket_id}</td>
                        <td>${x.event_id}</td>
                        <td>${x.ticket_type}</td>
                        <td>${x.price}</td>
                        <td>${x.quantity_available}</td>
                        <td>
                            <button onclick='editTicket(${JSON.stringify(x)})'>Edit</button>
                            <button onclick='deleteTicket(${x.ticket_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("ticketForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/TICKET`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: document.getElementById("ticket_event_id").value,
      ticket_type: document.getElementById("ticket_type").value,
      price: document.getElementById("price").value,
      quantity_available: document.getElementById("quantity_available").value
    })
  }).then(() => loadTickets());
});

// DELETE
function deleteTicket(id) {
    if (!confirm("Delete this ticket?")) return;

    fetch(`${API}/TICKET/${id}`, {
        method: "DELETE"
    }).then(() => loadTickets());
}

// EDIT
function editTicket(t) {
    const type = prompt("Ticket Type:", t.ticket_type);
    const price = prompt("Price:", t.price);
    const qty = prompt("Quantity:", t.quantity_available);

    if (!type || !price || !qty) return;

    fetch(`${API}/TICKET/${t.ticket_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ticket_type: type,
            price,
            quantity_available: qty
        })
    }).then(() => loadTickets());
}


function loadRegistrations() {
    fetch(`${API}/REGISTRATION`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("regTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(r => {
                table.innerHTML += `
                    <tr>
                        <td>${r.reg_id}</td>
                        <td>${r.event_id}</td>
                        <td>${r.participant_id}</td>
                        <td>${r.status}</td>
                        <td>${formatDateTimeSafe(r.registration_date)}</td>
                        <td>
                            <button onclick='editReg(${JSON.stringify(r)})'>Edit</button>
                            <button onclick='deleteReg(${r.reg_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("regForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/REGISTRATION`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: document.getElementById("reg_event_id").value,
      participant_id: document.getElementById("reg_participant_id").value,
      ticket_id: document.getElementById("reg_ticket_id").value
    })
  }).then(() => loadRegistrations());
});

// DELETE
function deleteReg(id) {
    if (!confirm("Delete this registration?")) return;

    fetch(`${API}/REGISTRATION/${id}`, {
        method: "DELETE"
    }).then(() => loadRegistrations());
}

// EDIT (status update only — realistic)
function editReg(r) {
    const status = prompt("Status (Pending/Confirmed/Cancelled):", r.status);

    if (!status) return;

    fetch(`${API}/REGISTRATION/${r.reg_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status
        })
    }).then(() => loadRegistrations());
}
function loadPayments() {
    fetch(`${API}/PAYMENT`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("paymentTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.payment_id}</td>
                        <td>${p.reg_id}</td>
                        <td>${p.amount}</td>
                        <td>${p.payment_method}</td>
                        <td>${p.payment_status}</td>
                        <td>${formatDateTimeSafe(p.payment_date)}</td>
                        <td>
                            <button onclick='editPayment(${JSON.stringify(p)})'>Edit</button>
                            <button onclick='deletePayment(${p.payment_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("paymentForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/PAYMENT`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    reg_id: document.getElementById("reg_id").value,
    amount: document.getElementById("amount").value,
    payment_method: document.getElementById("payment_method").value,
    payment_status: document.getElementById("payment_status").value
})
  }).then(() => loadPayments());
});

// DELETE
function deletePayment(id) {
    if (!confirm("Delete this payment?")) return;

    fetch(`${API}/PAYMENT/${id}`, {
        method: "DELETE"
    }).then(() => loadPayments());
}

// EDIT
function editPayment(p) {
    const amount = prompt("Amount:", p.amount);
    const method = prompt("Method:", p.payment_method);
    const status = prompt("Status:", p.payment_status);

    if (!amount) return;

    fetch(`${API}/PAYMENT/${p.payment_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount,
            payment_method: method,
            payment_status: status
        })
    }).then(() => loadPayments());
}
function loadSchedules() {
    fetch(`${API}/EVENT_SCHEDULE`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;

            const table = document.getElementById("scheduleTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(s => {
                table.innerHTML += `
                    <tr>
                        <td>${s.schedule_id}</td>
                        <td>${s.event_id}</td>
                        <td>${s.session_title}</td>
                        <td>${s.start_time}</td>
                        <td>${s.end_time}</td>
                        <td>
                            <button onclick='editSchedule(${JSON.stringify(s)})'>Edit</button>
                            <button onclick='deleteSchedule(${s.schedule_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// CREATE
document.getElementById("scheduleForm")?.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`${API}/EVENT_SCHEDULE`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: document.getElementById("sch_event_id").value,
      session_title: document.getElementById("session_title").value,
      start_time: document.getElementById("start_time").value,
      end_time: document.getElementById("end_time").value
    })
  }).then(() => loadSchedules());
});

// DELETE
function deleteSchedule(id) {
    if (!confirm("Delete this schedule?")) return;

    fetch(`${API}/EVENT_SCHEDULE/${id}`, {
        method: "DELETE"
    }).then(() => loadSchedules());
}

// EDIT
function editSchedule(s) {
    const title = prompt("Session Title:", s.session_title);
    const start = prompt("Start Time:", s.start_time);
    const end = prompt("End Time:", s.end_time);

    if (!title) return;

    fetch(`${API}/EVENT_SCHEDULE/${s.schedule_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            session_title: title,
            start_time: start,
            end_time: end
        })
    }).then(() => loadSchedules());
}
// ==========================
// EVENT_ORGANIZER (ASSIGNMENTS)
// ==========================
function loadEO() {
    fetch(`${API}/EVENT_ORGANIZER`)
        .then(res => res.json())
        .then(response => {
            const data = response.data || response;

            const table = document.getElementById("eoTable");
            if (!table) return;

            table.innerHTML = "";

            data.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item.event_id}</td>
                        <td>${item.organizer_id}</td>
                        <td>${item.assigned_role}</td>
                        <td>${formatDateSafe(item.assignment_date)}</td>
                        <td>
                            <button onclick='editEO(${JSON.stringify(item)})'>Edit</button>
                            <button onclick='deleteEO(${item.event_id}, ${item.organizer_id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}
let isEditModeEO = false;

function editEO(item) {
    isEditModeEO = true;

    document.getElementById("eo_event_id").value = item.event_id;
    document.getElementById("eo_org_id").value = item.organizer_id;
    document.getElementById("eo_role").value = item.assigned_role;
    document.getElementById("eo_assign_date").value = item.assignment_date || "";

    // lock IDs
    document.getElementById("eo_event_id").disabled = true;
    document.getElementById("eo_org_id").disabled = true;

    document.querySelector("#eoForm button").innerText = "Update";
}
document.getElementById("eoForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const eventId = document.getElementById("eo_event_id").value;
    const orgId = document.getElementById("eo_org_id").value;
    const role = document.getElementById("eo_role").value;
    const date = document.getElementById("eo_assign_date").value;

    if (isEditModeEO) {
        // UPDATE
        fetch(`${API}/EVENT_ORGANIZER`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event_id: eventId,
                organizer_id: orgId,
                assigned_role: role,
                assignment_date: date
            })
        }).then(() => {
            resetEOForm();
            loadEO();
        });
    } else {
        // CREATE
        fetch(`${API}/EVENT_ORGANIZER`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event_id: eventId,
                organizer_id: orgId,
                assigned_role: role,
                assignment_date: date
            })
        }).then(() => {
            resetEOForm();
            loadEO();
        });
    }
});
function deleteEO(eventId, orgId) {
    if (!confirm("Delete this assignment?")) return;

    fetch(`${API}/EVENT_ORGANIZER`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event_id: eventId,
            organizer_id: orgId
        })
    }).then(() => loadEO());
}
function resetEOForm() {
    isEditModeEO = false;

    document.getElementById("eoForm").reset();

    document.getElementById("eo_event_id").disabled = false;
    document.getElementById("eo_org_id").disabled = false;

    document.querySelector("#eoForm button").innerText = "Add";
}

// ==========================
// AUTO LOAD ALL TABLES
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("eventTable")) loadEvents();
    if (document.getElementById("venueTable")) loadVenues();
    if (document.getElementById("participantTable")) loadParticipants();
    if (document.getElementById("organizerTable")) loadOrganizers();
    if (document.getElementById("ticketTable")) loadTickets();
    if (document.getElementById("regTable")) loadRegistrations();
    if (document.getElementById("paymentTable")) loadPayments();
    if (document.getElementById("scheduleTable")) loadSchedules();
    if (document.getElementById("eoTable")) loadEO();
});
function formatDateTimeSafe(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function formatDateSafe(dateStr) {
  if (!dateStr) return "";

  // If already in YYYY-MM-DD format, just return it
  if (typeof dateStr === "string" && dateStr.includes("-") && dateStr.length <= 10) {
    return dateStr;
  }

  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
