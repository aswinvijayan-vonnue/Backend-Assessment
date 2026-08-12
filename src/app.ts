import express, { response } from "express";
import type { Request, Response } from "express";
import ticketRouter from "./Routes/ticketRoutes.js";

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ response: "OK" });
});
app.use("/ticket", ticketRouter);

export default app;
