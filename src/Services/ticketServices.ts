import type { TicketInput, Ticket, StatusType } from "../types/types.js";
import {
  addTicket,
  listTickets,
  writeToFile,
  deleteTicket,
} from "../repository/dataReadWrite.js";
class ValidationError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}
class NotFoundError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export async function postTicket(tck: TicketInput) {
  try {
    const isValid = validateTicket(tck);
    if (!isValid) throw new ValidationError("Invalid ticket entry", 422);
    const data: Ticket = { id: Date.now(), ...tck };
    await addTicket(data);
  } catch (err: unknown) {
    throw err;
  }
}

export async function getAllTicket() {
  try {
    const tickets = await listTickets();
    return tickets;
  } catch (err: unknown) {
    throw err;
  }
}

export async function viewSpecificTicket(id: Number) {
  try {
    const tickets = await listTickets();
    const ticket = tickets.find((tck) => tck.id === id);
    if (!ticket)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
    return ticket;
  } catch (err: unknown) {
    throw err;
  }
}

export async function updateStatus(id: number, status: string) {
  try {
    const tickets = await listTickets();
    const ticketIdx = tickets.findIndex((tck) => tck.id === id);
    if (ticketIdx === -1)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
    if (
      status.trim() === "" ||
      !(
        status.toLowerCase() === "pending" ||
        status.toLowerCase() === "completed"
      )
    )
      throw new ValidationError("Invalid status value", 422);
    const updatedStats =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    tickets[ticketIdx] = {
      ...tickets[ticketIdx],
      status: updatedStats as StatusType,
    };
    await writeToFile(tickets);
  } catch (err) {
    throw err;
  }
}

export async function assignTicket(id: number, name: string) {
  try {
    const tickets = await listTickets();
    const ticketIdx = tickets.findIndex((tck) => tck.id === id);
    if (ticketIdx === -1)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
    if (name.trim() === "")
      throw new ValidationError("Invalid assignee name", 422);
    const updatedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    tickets[ticketIdx] = {
      ...tickets[ticketIdx],
      assignee: updatedName,
    };
    await writeToFile(tickets);
  } catch (err) {
    throw err;
  }
}

export async function deleteTick(id: number) {
  try {
    const isOk = await deleteTicket(id);
    if (!isOk)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
  } catch (error) {
    throw error;
  }
}

function validateTicket(tck: unknown) {
  if (typeof tck !== "object" || !tck) return false;
  const obj = tck as Record<string, unknown>;
  return (
    typeof obj.title === "string" &&
    obj.title.trim().length > 0 &&
    typeof obj.description === "string" &&
    obj.description.trim().length > 0 &&
    (obj.priority === "Low" ||
      obj.priority === "Medium" ||
      obj.priority === "High") &&
    (obj.status === "Pending" || obj.status === "Completed")
  );
}
