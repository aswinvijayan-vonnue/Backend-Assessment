import express, { response } from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ response: "OK" });
});

export default app;
