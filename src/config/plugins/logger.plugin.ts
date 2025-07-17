import { createLogger, format, transports } from "winston";

type levelType = "info" | "error";

export const useLogger = (message: string, level: levelType = "info") => {
  const logger = createLogger({
    level,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/combined.log" }),
    ],
  });

  logger.log({ level, message });
};
