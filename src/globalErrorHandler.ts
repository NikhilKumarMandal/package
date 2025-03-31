import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";


// Global Error Handler
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorId = uuid();
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction ? "Internal Server Error" : err.message;

  console.error(`[${errorId}] ${message}`, err);

  return res.status(statusCode).json({
    success: false,
    errors: [
      {
        ref: errorId,
        type: err.name || "Error",
        msg: message,
        path: req.path,
        method: req.method,
        stack: isProduction ? null : err.stack,
      },
    ],
  });
};

export { globalErrorHandler };
