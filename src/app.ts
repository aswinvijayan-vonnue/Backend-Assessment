import express, { response } from "express";
import type { Request, Response } from "express";
import ticketRouter from "./Routes/ticketRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import { errorHandler } from "./Middlewares/errorHandling.js";
import { notFoundHandler } from "./Middlewares/notFoundHandling.js";
const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ response: "OK" });
});
app.use("/ticket", ticketRouter);
app.use("/user", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
