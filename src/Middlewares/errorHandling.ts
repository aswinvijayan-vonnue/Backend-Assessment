import { type Request, type Response, type NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Error)
    return res.status(500).json({ success: false, message: err.message });
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
}
