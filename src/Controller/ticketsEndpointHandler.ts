import { type Request, type Response } from "express";
import {
  getAllTicket,
  postTicket,
  viewSpecificTicket,
  updateStatus,
  assignTicket,
  deleteTick,
} from "../Services/ticketServices.js";
import type { TicketInput } from "../types/types";
import { ValidationError, NotFoundError } from "../Services/ticketServices.js";

export async function getTicketDetails(req: Request, res: Response) {
  const tickets = await getAllTicket();
  res.status(200).json(tickets);
}

export async function enterTicket(req: Request, res: Response) {
  try {
    const ticket: TicketInput = req.body;
    await postTicket(ticket);
    res.status(201).json({ success: "Created new ticket successfully" });
  } catch (err: unknown) {
    if (err instanceof ValidationError)
      res.status(err.statusCode).json({ error: err.message });
    if (err instanceof Error) res.status(400).json({ error: err.message });
    throw err;
  }
}

export async function getSpecificTicketInformation(
  req: Request,
  res: Response,
) {
  try {
    const ticketId = Number(req.params.ticketId);
    const ticket = await viewSpecificTicket(ticketId);
    res.status(200).json(ticket);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
}

export async function statusUpdateController(req: Request, res: Response) {
  try {
    const id = Number(req.params.ticketId);
    const { status, assignee } = req.body;
    if (status && status.trim() !== "") await updateStatus(id, status);
    else if (assignee && assignee.trim() !== "")
      await assignTicket(id, assignee);
    else throw new Error("Request body cannot be empty");
    res.status(200).json({ success: "Updated successfully" });
  } catch (err: unknown) {
    if (err instanceof ValidationError || err instanceof NotFoundError)
      return res.status(err.statusCode).json({ error: err.message });
    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
    throw err;
  }
}

export async function deleteTicketController(req: Request, res: Response) {
  try {
    const id = Number(req.params.ticketId);
    await deleteTick(id);
    res.status(202).json({ success: true, message: "deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof NotFoundError)
      return res
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    if (err instanceof Error)
      return res.status(400).json({ success: false, message: err.message });
    throw err;
  }
}
