import * as env from "env-var";

export const ENVS = {
  PORT: env.get("PORT").default("3000").asPortNumber(),
  NODE_ENV: env.get("NODE_ENV").default("development").asString(),
  MONGO_URI: env.get("MONGO_URI").required().asString(),
}