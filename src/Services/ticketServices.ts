import type { TicketInput, Ticket, StatusType } from "../types/types.js";
import {
  addTicket,
  listTickets,
  writeToFile,
  deleteTicket,
  getTicketById,
  updateStatusById,
  updateAssignee,
} from "../Repository/dataReadWrite.js";
export class ValidationError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;

    //to make instanceof check in catch block
    // Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
export class NotFoundError extends Error {
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

export async function viewSpecificTicket(id: number) {
  try {
    const res = await getTicketById(id);
    if (!res)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
    return res;
  } catch (err: unknown) {
    throw err;
  }
}

export async function updateStatus(id: number, status: string) {
  try {
    if (
      status.trim() === "" ||
      !(
        status.toLowerCase() === "pending" ||
        status.toLowerCase() === "completed" ||
        status.toLowerCase() === "in progress"
      )
    )
      throw new ValidationError("Invalid status value", 422);
    const updatedStats =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    const res = await updateStatusById(id, updatedStats);
    if (!res)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
  } catch (err) {
    throw err;
  }
}

export async function assignTicket(id: number, assigneeId: number) {
  try {
    const res = await updateAssignee(id, assigneeId);
    if (!res)
      throw new NotFoundError(`No record found for the provided ID:${id}`, 404);
  } catch (err) {
    if ((err as any).code === "23503") throw Error("Invalid assignee id");
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
