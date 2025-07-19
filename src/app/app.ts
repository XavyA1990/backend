import express from "express";
import { loggerMiddleware } from "../middlewares/logger.middleware";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import healthRoute from "./../routes/health.route";
import usersRoute from "../routes/users.route";
import boardsRoute from "../routes/boards.route";
import path from "path";

const app = express();
// Middleware setup
app.use(loggerMiddleware);
app.use(compression());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "..", "..", "public")));

// Routes setup
app.use("/health", healthRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/boards", boardsRoute);

export default app;