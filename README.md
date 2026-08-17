# File-backed Support Ticket API

Ticket API system in which tickets are stored in a json file.

## How to Build and Run

- Clone the repo using git clone

```text
 https://github.com/aswinvijayan-vonnue/Backend-Assessment.git
```

- Run the command `npm install `
- Now run `npm run build ` which will convert typeScript files into js file.
- Run `npm run devstart ` to run the server.

## How to Test

- Run `npm run test `.

## API Examples

### BASE URL

```text
http://localhost:8080
```

### 1. Get all Tickets

**Endpoint**

GET /ticket

eg: GET `http://localhost:8080/ticket`

### 2. Get specific Ticket

**Endpoint**

GET /ticket/:ticketId

eg: GET `http://localhost:8080/ticket/1786511561054`

### 3. Post new Ticket

**Endpoint**

POST /ticket

**Request Body**

```json
{
  "title": "Software bug",
  "description": "Login button is not working",
  "priority": "High",
  "status": "Pending"
}
```

eg: POST `http://localhost:8080/ticket`

### 4. Update Ticket Status

**Endpoint**

PATCH /ticket/ticketId

**Request Body**

```json
{
  "status": "Completed"
}
```

eg: PATCH `http://localhost:8080/ticket/1786511561054`

### 5. Add Assignee on Raised Ticket

**Endpoint**

PATCH /ticket/ticketId

**Request Body**

```json
{
  "assignee": "Rahul"
}
```

eg: PATCH `http://localhost:8080/ticket/1786511561054`

### 6. Delete Ticket

**Endpoint**

DELETE /ticket/ticketId

eg: DELETE `http://localhost:8080/ticket/1786511561054`
