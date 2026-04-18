// Temporary in-memory storage (replace with DB later)

let events = [];
let participants = [];

// ADD EVENT
function addEvent() {
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;

    events.push({ name, date });

    displayEvents();
}

// DISPLAY EVENTS
function displayEvents() {
    const table = document.getElementById("eventTable");
    table.innerHTML = "";

    events.forEach((e, index) => {
        table.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.date}</td>
                <td>
                    <button class="btn" onclick="deleteEvent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteEvent(i) {
    events.splice(i, 1);
    displayEvents();
}