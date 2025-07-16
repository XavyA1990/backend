import app from "./app/app";
import { ENVS } from "./config/envs";
import { useLogger } from "./config/plugins/logger";
import "./data/db_connection";

app.listen(ENVS.PORT, () => {
  useLogger(`Server is running on ${ENVS.NODE_ENV} mode`, "info");
});
