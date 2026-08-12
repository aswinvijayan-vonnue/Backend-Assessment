import { type Request, type Response } from "express";
import { getAllTicket, postTicket } from "../Services/ticketServices.js";
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
