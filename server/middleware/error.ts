import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb id error
  if (err.name == "CastError") {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new Error(message);
    err.statusCode = 400;
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Error(message);
    err.statusCode = 400;
  }
  // Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token. Please login again`;
    err = new Error(message);
    err.statusCode = 400;
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Token expired. Please try again`;
    err = new Error(message);
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
