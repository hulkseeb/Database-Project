// Fake data (replace with DB later)

let events = ["TechFest", "AI Bootcamp", "Startup Summit"];
let participants = ["Rahim", "Sumaiya", "Tanvir", "Nusrat"];
let venues = ["NSU Auditorium", "Bashundhara Hall"];
let registrations = [1,2,3,4,5,6];

// UPDATE COUNTS
document.getElementById("totalEvents").innerText = events.length;
document.getElementById("totalParticipants").innerText = participants.length;
document.getElementById("totalVenues").innerText = venues.length;
document.getElementById("totalRegistrations").innerText = registrations.length;

// ACTIVITY FEED
const activityList = document.getElementById("activityList");

let activities = [
    "New event 'TechFest' created",
    "Rahim registered for event",
    "Payment completed",
    "New venue added"
];

activities.forEach(a => {
    let li = document.createElement("li");
    li.innerText = a;
    activityList.appendChild(li);
});