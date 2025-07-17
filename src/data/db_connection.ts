import mongoose from "mongoose";

import { ENVS } from "../config/envs";
import { useLogger } from "../config/plugins/logger.plugin";

mongoose
  .connect(ENVS.MONGO_URI)
  .then(() => {
    useLogger("MongoDB connected successfully", "info");
  })
  .catch((error) => {
    useLogger(`MongoDB connection error: ${error.message}`, "error");
    process.exit(1);
  });
