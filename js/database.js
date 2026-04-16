// DATABASE USING LOCAL STORAGE

function getData(key){
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}


// ADD VENUE
function addVenue(){
    let name = document.getElementById("venueName").value;

    let venues = getData("venues");

    venues.push({
        id: venues.length + 1,
        name: name
    });

    saveData("venues",venues);

    alert("Venue Added");
    showVenues();
}


// SHOW VENUES
function showVenues(){

    let venues = getData("venues");

    let table = document.getElementById("venueTable");

    table.innerHTML = "";

    venues.forEach(v=>{
        table.innerHTML += `
        <tr>
            <td>${v.id}</td>
            <td>${v.name}</td>
        </tr>`;
    });

}



// ADD ORGANIZER
function addOrganizer(){

    let name = document.getElementById("organizerName").value;

    let organizers = getData("organizers");

    organizers.push({
        id: organizers.length + 1,
        name:name
    });

    saveData("organizers",organizers);

    alert("Organizer Added");

    showOrganizers();

}


// SHOW ORGANIZERS
function showOrganizers(){

    let organizers = getData("organizers");

    let table = document.getElementById("organizerTable");

    table.innerHTML="";

    organizers.forEach(o=>{
        table.innerHTML += `
        <tr>
            <td>${o.id}</td>
            <td>${o.name}</td>
        </tr>`;
    });

}
