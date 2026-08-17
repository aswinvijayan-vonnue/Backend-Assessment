import fs from "node:fs/promises";
import path from "node:path";
import { Ticket, User } from "../types/types.js";
import pool from "../db.js";

const fileName = path.join(process.cwd(), "src", "Repository", "tickets.json");

export async function readFromFile(file: string = fileName): Promise<Ticket[]> {
  try {
    const content = await fs.readFile(file, "utf-8");
    if (!content.trim()) {
      await writeToFile([]);
      return [];
    }
    const response = JSON.parse(content);
    if (response.tickets) return response.tickets;
    else return [];
  } catch (error: unknown) {
    if (error instanceof Error && error && "code" in error) {
      if (error.code === "ENOENT") {
        console.log("error:", error);
        await writeToFile([]);
        return [];
      }
    }
    throw error;
  }
}

export async function writeToFile(arr: Array<Ticket>, file: string = fileName) {
  try {
    const res = { tickets: arr };
    const stringifiedRes = JSON.stringify(res);
    await fs.writeFile(file, stringifiedRes);
  } catch (error: unknown) {
    throw error;
  }
}

export async function listTickets(): Promise<Ticket[]> {
  try {
    const query = "SELECT * FROM support_ticket_system.TICKETS";
    const res = await pool.query<Ticket>(query);
    return res.rows;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getTicketById(id: number) {
  try {
    const query = `SELECT * FROM support_ticket_system.TICKETS WHERE id=${id}`;
    const res = await pool.query(query);
    if (res.rowCount === 0) return;
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateStatusById(id: number, status: string) {
  try {
    const query = `UPDATE support_ticket_system.TICKETS SET status=$2 where id=$1 RETURNING *`;
    const res = await pool.query(query, [id, status]);
    console.log(res.rows[0]);
    if (res.rowCount === 0) return;
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateAssignee(ticketId: number, assigneeId: number) {
  try {
    const query = `UPDATE support_ticket_system.TICKETS
                SET assignee=$1
                WHERE id=$2`;
    const res = await pool.query(query, [assigneeId, ticketId]);
    if (res.rowCount === 0) return false;
    return true;
  } catch (error) {
    throw error;
  }
}

export async function addTicket(ticket: Ticket) {
  try {
    const query = `INSERT INTO support_ticket_system.TICKETS (title,description,priority,status) VALUES ($1,$2,$3,$4) RETURNING *`;
    const response = await pool.query<Ticket>(query, [
      ticket.title,
      ticket.description,
      ticket.priority,
      ticket.status,
    ]);
    return response.rows[0];
  } catch (error: unknown) {
    throw error;
  }
}

export async function deleteTicket(id: number) {
  try {
    const query = `DELETE FROM support_ticket_system.TICKETS WHERE id=${id}`;
    const res = await pool.query(query);
    if (res.rowCount === 0) return false;
    return true;
  } catch (error: unknown) {
    throw error;
  }
}
export async function addUser(user: User) {
  try {
    const query = `INSERT INTO support_ticket_system.USERS (name,email) VALUES ($1,$2) RETURNING *`;
    const res = await pool.query(query, [user.name, user.email]);
    console.log(res.rows);
  } catch (error: unknown) {
    throw error;
  }
}
