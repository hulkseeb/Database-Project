// ============================================================
// Event Management System — In-Browser Database
// Mirrors the MySQL schema exactly. Since GitHub Pages is
// static-only (no PHP/MySQL), all data lives here as JS objects.
// In a production deployment you'd replace fetch() calls to
// a REST API / Supabase / Firebase instead of this file.
// ============================================================

const DB = {

  venues: [
    { venue_id: 1, venue_name: "NSU Auditorium",               location: "North South University, Bashundhara, Dhaka", capacity: 500,  description: "Main university auditorium with full AV setup" },
    { venue_id: 2, venue_name: "Bashundhara Convention City",   location: "Bashundhara, Dhaka",                         capacity: 3000, description: "Large multi-hall convention center" },
    { venue_id: 3, venue_name: "BRAC University Seminar Hall",  location: "Mohakhali, Dhaka",                           capacity: 200,  description: "Compact hall suitable for seminars and workshops" },
    { venue_id: 4, venue_name: "Dhaka Regency Ballroom",        location: "Airport Road, Dhaka",                        capacity: 800,  description: "Hotel ballroom with catering facilities" },
    { venue_id: 5, venue_name: "ICT Tower Conference Room",     location: "Agargaon, Dhaka",                            capacity: 150,  description: "Government ICT division conference venue" },
  ],

  events: [
    { event_id: 1, event_name: "Boshonto Boron 2026",           event_date: "2026-02-13", event_time: "09:00", venue_id: 4, description: "Celebration of the arrival of spring with cultural performances, traditional attire, and festive activities" },
    { event_id: 2, event_name: "Arka Fashion 2026",             event_date: "2026-03-20", event_time: "11:00", venue_id: 2, description: "Annual inter-university fashion show and lifestyle exhibition showcasing student designers and brands" },
    { event_id: 3, event_name: "Rishka Fest 2026",              event_date: "2026-04-14", event_time: "10:00", venue_id: 1, description: "Bangladeshi New Year themed cultural fest with music, food stalls, art installations, and folk performances" },
    { event_id: 4, event_name: "NSU TechFest 2026",             event_date: "2026-05-10", event_time: "09:00", venue_id: 1, description: "Annual technology festival featuring workshops, hackathons, and project competitions" },
    { event_id: 5, event_name: "National Startup Summit 2026",  event_date: "2026-06-18", event_time: "10:00", venue_id: 2, description: "Premier networking event connecting startups, venture capitalists, and industry leaders" },
    { event_id: 6, event_name: "Cybersecurity Awareness Day 2026", event_date: "2026-07-22", event_time: "09:30", venue_id: 5, description: "Hands-on workshop on ethical hacking, digital safety, and cyber threat awareness" },
    { event_id: 7, event_name: "AI & ML Bootcamp 2026",         event_date: "2026-08-05", event_time: "08:00", venue_id: 3, description: "Intensive two-day bootcamp covering machine learning fundamentals and real-world AI applications" },
  ],

  participants: [
    { participant_id: 1,  name: "Rahim Uddin",    email: "rahim.uddin@example.com",    phone: "01711-000001", address: "Mirpur, Dhaka" },
    { participant_id: 2,  name: "Sumaiya Akter",  email: "sumaiya.akter@example.com",  phone: "01712-000002", address: "Uttara, Dhaka" },
    { participant_id: 3,  name: "Tanvir Hossain", email: "tanvir.hossain@example.com", phone: "01713-000003", address: "Gulshan, Dhaka" },
    { participant_id: 4,  name: "Nusrat Jahan",   email: "nusrat.jahan@example.com",   phone: "01714-000004", address: "Dhanmondi, Dhaka" },
    { participant_id: 5,  name: "Arif Rahman",    email: "arif.rahman@example.com",    phone: "01715-000005", address: "Bashundhara, Dhaka" },
    { participant_id: 6,  name: "Fariha Islam",   email: "fariha.islam@example.com",   phone: "01716-000006", address: "Mohammadpur, Dhaka" },
    { participant_id: 7,  name: "Sazzad Hasan",   email: "sazzad.hasan@example.com",   phone: "01717-000007", address: "Rampura, Dhaka" },
    { participant_id: 8,  name: "Mehnaz Begum",   email: "mehnaz.begum@example.com",   phone: "01718-000008", address: "Tejgaon, Dhaka" },
    { participant_id: 9,  name: "Jubayer Ahmed",  email: "jubayer.ahmed@example.com",  phone: "01719-000009", address: "Motijheel, Dhaka" },
    { participant_id: 10, name: "Lamia Sultana",  email: "lamia.sultana@example.com",  phone: "01720-000010", address: "Banani, Dhaka" },
  ],

  organizers: [
    { organizer_id: 1, name: "Ahidul Hasan Dipu", email: "dipu@nsu.edu.bd",   phone: "01811-111001", role: "Manager" },
    { organizer_id: 2, name: "Sohail Kabir",       email: "sohail@nsu.edu.bd", phone: "01811-111002", role: "Coordinator" },
    { organizer_id: 3, name: "Abdullah Al Muhim",  email: "muhim@nsu.edu.bd",  phone: "01811-111003", role: "Logistics" },
    { organizer_id: 4, name: "Tasnia Chowdhury",   email: "tasnia@nsu.edu.bd", phone: "01811-111004", role: "Promotions" },
    { organizer_id: 5, name: "Rafiq Islam",         email: "rafiq@nsu.edu.bd",  phone: "01811-111005", role: "Finance" },
  ],

  registrations: [
    { reg_id: 1,  event_id: 1, participant_id: 1,  registration_date: "2026-01-10 10:00", status: "Confirmed" },
    { reg_id: 2,  event_id: 1, participant_id: 2,  registration_date: "2026-01-11 11:00", status: "Confirmed" },
    { reg_id: 3,  event_id: 1, participant_id: 3,  registration_date: "2026-01-12 09:30", status: "Pending" },
    { reg_id: 4,  event_id: 2, participant_id: 4,  registration_date: "2026-02-15 14:00", status: "Confirmed" },
    { reg_id: 5,  event_id: 2, participant_id: 5,  registration_date: "2026-02-16 15:00", status: "Confirmed" },
    { reg_id: 6,  event_id: 3, participant_id: 6,  registration_date: "2026-03-01 10:00", status: "Confirmed" },
    { reg_id: 7,  event_id: 3, participant_id: 7,  registration_date: "2026-03-02 11:00", status: "Cancelled" },
    { reg_id: 8,  event_id: 4, participant_id: 8,  registration_date: "2026-04-01 08:00", status: "Confirmed" },
    { reg_id: 9,  event_id: 4, participant_id: 9,  registration_date: "2026-04-02 09:00", status: "Pending" },
    { reg_id: 10, event_id: 5, participant_id: 10, registration_date: "2026-05-01 12:00", status: "Confirmed" },
    { reg_id: 11, event_id: 5, participant_id: 1,  registration_date: "2026-05-02 13:00", status: "Confirmed" },
    { reg_id: 12, event_id: 6, participant_id: 2,  registration_date: "2026-06-10 10:00", status: "Pending" },
    { reg_id: 13, event_id: 6, participant_id: 3,  registration_date: "2026-06-11 11:00", status: "Confirmed" },
    { reg_id: 14, event_id: 7, participant_id: 4,  registration_date: "2026-07-01 09:00", status: "Confirmed" },
    { reg_id: 15, event_id: 7, participant_id: 5,  registration_date: "2026-07-02 10:00", status: "Confirmed" },
  ],

  event_organizers: [
    { event_id: 1, organizer_id: 1, assigned_role: "Manager",     assignment_date: "2026-01-01" },
    { event_id: 1, organizer_id: 2, assigned_role: "Coordinator", assignment_date: "2026-01-01" },
    { event_id: 1, organizer_id: 4, assigned_role: "Promotions",  assignment_date: "2026-01-03" },
    { event_id: 2, organizer_id: 1, assigned_role: "Manager",     assignment_date: "2026-02-01" },
    { event_id: 2, organizer_id: 5, assigned_role: "Finance",     assignment_date: "2026-02-01" },
    { event_id: 3, organizer_id: 2, assigned_role: "Coordinator", assignment_date: "2026-02-20" },
    { event_id: 3, organizer_id: 3, assigned_role: "Logistics",   assignment_date: "2026-02-20" },
    { event_id: 4, organizer_id: 4, assigned_role: "Promotions",  assignment_date: "2026-03-25" },
    { event_id: 4, organizer_id: 5, assigned_role: "Finance",     assignment_date: "2026-03-25" },
    { event_id: 5, organizer_id: 1, assigned_role: "Manager",     assignment_date: "2026-04-15" },
    { event_id: 5, organizer_id: 3, assigned_role: "Logistics",   assignment_date: "2026-04-15" },
    { event_id: 6, organizer_id: 2, assigned_role: "Coordinator", assignment_date: "2026-05-20" },
    { event_id: 6, organizer_id: 4, assigned_role: "Promotions",  assignment_date: "2026-05-20" },
    { event_id: 7, organizer_id: 3, assigned_role: "Logistics",   assignment_date: "2026-06-15" },
    { event_id: 7, organizer_id: 5, assigned_role: "Finance",     assignment_date: "2026-06-15" },
  ],

  // Helper joins
  getVenue(id) { return this.venues.find(v => v.venue_id === id); },
  getEvent(id) { return this.events.find(e => e.event_id === id); },
  getParticipant(id) { return this.participants.find(p => p.participant_id === id); },
  getOrganizer(id) { return this.organizers.find(o => o.organizer_id === id); },
  getEventRegistrations(event_id) { return this.registrations.filter(r => r.event_id === event_id); },
  getEventOrganizers(event_id) { return this.event_organizers.filter(eo => eo.event_id === event_id).map(eo => ({ ...this.getOrganizer(eo.organizer_id), assigned_role: eo.assigned_role })); },
};
