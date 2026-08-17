DROP SCHEMA IF EXISTS support_ticket_system CASCADE;

CREATE SCHEMA support_ticket_system;

CREATE TABLE support_ticket_system.USERS(
    user_id INT GENERATED ALWAYS AS IDENTITY(START WITH 500) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL 
);

CREATE TABLE support_ticket_system.TICKETS(
    id INT GENERATED ALWAYS AS IDENTITY (START WITH 1000) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(30) CHECK(LOWER(priority) IN ('low','medium','high')),
    status VARCHAR(30) CHECK(LOWER(status) IN ('pending','in progress','completed')),
    assignee INT REFERENCES support_ticket_system.USERS(user_id) ON DELETE CASCADE,
    created_at timestamptz default NOW()
    );