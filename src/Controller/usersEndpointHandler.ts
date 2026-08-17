import { Request, Response } from "express";
import { postUser } from "../Services/userService.js";
import { User } from "../types/types.js";
import { ValidationError } from "../Services/ticketServices.js";

export async function enterUser(req: Request, res: Response) {
  try {
    const user: User = req.body;
    await postUser(user);
    res.status(201).json({ success: "Added new user successfully" });
  } catch (err) {
    if (err instanceof ValidationError)
      res.status(err.statusCode).json({ error: err.message });
    if (err instanceof Error) res.status(400).json({ error: err.message });
    throw err;
  }
}
