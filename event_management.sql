-- ============================================================
-- Event Management System
-- Course: CSE 311 LAB | Section: 05 | Group: 05
-- Members: Ahidul Hasan Dipu, Sohail Kabir, Abdullah Al Muhim
-- ============================================================

CREATE DATABASE IF NOT EXISTS event_management;
USE event_management;

-- ============================================================
-- TABLE: VENUE
-- ============================================================
CREATE TABLE VENUE (
    venue_id    INT             NOT NULL AUTO_INCREMENT,
    venue_name  VARCHAR(50)     NOT NULL,
    location    VARCHAR(100)    NOT NULL,
    capacity    INT,
    description TEXT,
    CONSTRAINT PK_VENUE PRIMARY KEY (venue_id)
);

-- ============================================================
-- TABLE: EVENT
-- ============================================================
CREATE TABLE EVENT (
    event_id    INT             NOT NULL AUTO_INCREMENT,
    event_name  VARCHAR(100)    NOT NULL,
    event_date  DATE            NOT NULL,
    event_time  TIME,
    description TEXT,
    venue_id    INT             NOT NULL,
    CONSTRAINT PK_EVENT         PRIMARY KEY (event_id),
    CONSTRAINT FK_EVENT_VENUE   FOREIGN KEY (venue_id) REFERENCES VENUE(venue_id)
                                    ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT UQ_VENUE_DATE_TIME UNIQUE (venue_id, event_date, event_time)
);

-- ============================================================
-- TABLE: PARTICIPANT
-- ============================================================
CREATE TABLE PARTICIPANT (
    participant_id  INT             NOT NULL AUTO_INCREMENT,
    name            VARCHAR(50)     NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    phone           VARCHAR(20),
    address         VARCHAR(100),
    CONSTRAINT PK_PARTICIPANT   PRIMARY KEY (participant_id),
    CONSTRAINT UQ_PARTICIPANT_EMAIL UNIQUE (email)
);

-- ============================================================
-- TABLE: ORGANIZER
-- ============================================================
CREATE TABLE ORGANIZER (
    organizer_id    INT             NOT NULL AUTO_INCREMENT,
    name            VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL,
    phone           VARCHAR(20),
    role            VARCHAR(20),
    CONSTRAINT PK_ORGANIZER         PRIMARY KEY (organizer_id),
    CONSTRAINT UQ_ORGANIZER_EMAIL   UNIQUE (email)
);

-- ============================================================
-- TABLE: REGISTRATION
-- ============================================================
CREATE TABLE REGISTRATION (
    reg_id              INT             NOT NULL AUTO_INCREMENT,
    event_id            INT             NOT NULL,
    participant_id      INT             NOT NULL,
    registration_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    status              VARCHAR(20)     DEFAULT 'Pending',
    CONSTRAINT PK_REGISTRATION         PRIMARY KEY (reg_id),
    CONSTRAINT FK_REG_EVENT            FOREIGN KEY (event_id)
                                           REFERENCES EVENT(event_id)
                                           ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_REG_PARTICIPANT      FOREIGN KEY (participant_id)
                                           REFERENCES PARTICIPANT(participant_id)
                                           ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UQ_EVENT_PARTICIPANT    UNIQUE (event_id, participant_id)
);

-- ============================================================
-- TABLE: EVENT_ORGANIZER  (Junction Table — M:N)
-- ============================================================
CREATE TABLE EVENT_ORGANIZER (
    event_id        INT             NOT NULL,
    organizer_id    INT             NOT NULL,
    assigned_role   VARCHAR(20),
    assignment_date DATE,
    CONSTRAINT PK_EVENT_ORGANIZER   PRIMARY KEY (event_id, organizer_id),
    CONSTRAINT FK_EO_EVENT          FOREIGN KEY (event_id)
                                        REFERENCES EVENT(event_id)
                                        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_EO_ORGANIZER      FOREIGN KEY (organizer_id)
                                        REFERENCES ORGANIZER(organizer_id)
                                        ON DELETE CASCADE ON UPDATE CASCADE
);


-- ============================================================
-- The datas are filled
-- ============================================================

-- VENUE
INSERT INTO VENUE (venue_name, location, capacity, description) VALUES
('NSU Auditorium',      'North South University, Bashundhara, Dhaka',   500,  'Main university auditorium with full AV setup'),
('Bashundhara Convention City', 'Bashundhara, Dhaka',                   3000, 'Large multi-hall convention center'),
('BRAC University Seminar Hall', 'Mohakhali, Dhaka',                    200,  'Compact hall suitable for seminars and workshops'),
('Dhaka Regency Ballroom',  'Airport Road, Dhaka',                      800,  'Hotel ballroom with catering facilities'),
('ICT Tower Conference Room', 'Agargaon, Dhaka',                        150,  'Government ICT division conference venue');

-- EVENT
INSERT INTO EVENT (event_name, event_date, event_time, description, venue_id) VALUES
('Boshonto Boron 2026',     '2026-02-13', '09:00:00', 'Celebration of the arrival of spring with cultural performances, traditional attire, and festive activities',  4),
('Arka Fashion 2026',       '2026-03-20', '11:00:00', 'Annual inter-university fashion show and lifestyle exhibition showcasing student designers and brands',          2),
('Rishka Fest 2026',        '2026-04-14', '10:00:00', 'Bangladeshi New Year themed cultural fest with music, food stalls, art installations, and folk performances',   1),
('NSU TechFest 2026',       '2026-05-10', '09:00:00', 'Annual technology festival featuring workshops, hackathons, and project competitions',                          1),
('National Startup Summit 2026', '2026-06-18', '10:00:00', 'Premier networking event connecting startups, venture capitalists, and industry leaders',                 2),
('Cybersecurity Awareness Day 2026', '2026-07-22', '09:30:00', 'Hands-on workshop on ethical hacking, digital safety, and cyber threat awareness',                   5),
('AI & ML Bootcamp 2026',   '2026-08-05', '08:00:00', 'Intensive two-day bootcamp covering machine learning fundamentals and real-world AI applications',             3);

-- PARTICIPANT
INSERT INTO PARTICIPANT (name, email, phone, address) VALUES
('Rahim Uddin',     'rahim.uddin@example.com',      '01711-000001', 'Mirpur, Dhaka'),
('Sumaiya Akter',   'sumaiya.akter@example.com',    '01712-000002', 'Uttara, Dhaka'),
('Tanvir Hossain',  'tanvir.hossain@example.com',   '01713-000003', 'Gulshan, Dhaka'),
('Nusrat Jahan',    'nusrat.jahan@example.com',     '01714-000004', 'Dhanmondi, Dhaka'),
('Arif Rahman',     'arif.rahman@example.com',      '01715-000005', 'Bashundhara, Dhaka'),
('Fariha Islam',    'fariha.islam@example.com',     '01716-000006', 'Mohammadpur, Dhaka'),
('Sazzad Hasan',    'sazzad.hasan@example.com',     '01717-000007', 'Rampura, Dhaka'),
('Mehnaz Begum',    'mehnaz.begum@example.com',     '01718-000008', 'Tejgaon, Dhaka'),
('Jubayer Ahmed',   'jubayer.ahmed@example.com',    '01719-000009', 'Motijheel, Dhaka'),
('Lamia Sultana',   'lamia.sultana@example.com',    '01720-000010', 'Banani, Dhaka');

-- ORGANIZER
INSERT INTO ORGANIZER (name, email, phone, role) VALUES
('Ahidul Hasan Dipu',   'dipu@nsu.edu.bd',      '01811-111001', 'Manager'),
('Sohail Kabir',        'sohail@nsu.edu.bd',    '01811-111002', 'Coordinator'),
('Abdullah Al Muhim',   'muhim@nsu.edu.bd',     '01811-111003', 'Logistics'),
('Tasnia Chowdhury',    'tasnia@nsu.edu.bd',    '01811-111004', 'Promotions'),
('Rafiq Islam',         'rafiq@nsu.edu.bd',     '01811-111005', 'Finance');

-- REGISTRATION
INSERT INTO REGISTRATION (event_id, participant_id, registration_date, status) VALUES
(1, 1,  '2026-01-10 10:00:00', 'Confirmed'),
(1, 2,  '2026-01-11 11:00:00', 'Confirmed'),
(1, 3,  '2026-01-12 09:30:00', 'Pending'),
(2, 4,  '2026-02-15 14:00:00', 'Confirmed'),
(2, 5,  '2026-02-16 15:00:00', 'Confirmed'),
(3, 6,  '2026-03-01 10:00:00', 'Confirmed'),
(3, 7,  '2026-03-02 11:00:00', 'Cancelled'),
(4, 8,  '2026-04-01 08:00:00', 'Confirmed'),
(4, 9,  '2026-04-02 09:00:00', 'Pending'),
(5, 10, '2026-05-01 12:00:00', 'Confirmed'),
(5, 1,  '2026-05-02 13:00:00', 'Confirmed'),
(6, 2,  '2026-06-10 10:00:00', 'Pending'),
(6, 3,  '2026-06-11 11:00:00', 'Confirmed'),
(7, 4,  '2026-07-01 09:00:00', 'Confirmed'),
(7, 5,  '2026-07-02 10:00:00', 'Confirmed');

-- EVENT_ORGANIZER
INSERT INTO EVENT_ORGANIZER (event_id, organizer_id, assigned_role, assignment_date) VALUES
(1, 1, 'Manager',     '2026-01-01'),
(1, 2, 'Coordinator', '2026-01-01'),
(1, 4, 'Promotions',  '2026-01-03'),
(2, 1, 'Manager',     '2026-02-01'),
(2, 5, 'Finance',     '2026-02-01'),
(3, 2, 'Coordinator', '2026-02-20'),
(3, 3, 'Logistics',   '2026-02-20'),
(4, 4, 'Promotions',  '2026-03-25'),
(4, 5, 'Finance',     '2026-03-25'),
(5, 1, 'Manager',     '2026-04-15'),
(5, 3, 'Logistics',   '2026-04-15'),
(6, 2, 'Coordinator', '2026-05-20'),
(6, 4, 'Promotions',  '2026-05-20'),
(7, 3, 'Logistics',   '2026-06-15'),
(7, 5, 'Finance',     '2026-06-15');

-- ============================================================
-- END OF SCRIPT
-- ============================================================
