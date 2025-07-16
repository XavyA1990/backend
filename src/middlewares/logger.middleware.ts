import { NextFunction, Request, Response } from "express";
import { useLogger } from "../config/plugins/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, originalUrl } = req;
  const message = `${method} ${originalUrl}`;
  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

  useLogger(`${message} - IP: ${ip}`, "info");
  next();
};
