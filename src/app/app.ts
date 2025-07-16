import express from "express";
import healthRoute from "./../routes/health.route";
import { loggerMiddleware } from "../middlewares/logger.middleware";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(loggerMiddleware);
app.use(compression());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.use("/health", healthRoute);

export default app;