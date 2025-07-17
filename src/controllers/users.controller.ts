import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { registerUser } from "../services/users.service";
import { SUCCESS } from "../lib/constants/labels";
import { useLogger } from "../config/plugins/logger.plugin";
import { handleStatusCode } from "../lib/helpers/status-code.helper";

const register = (req: Request, res: Response) => {
  const userData = req.body as Omit<IUser, "_id">;

  registerUser(userData)
    .then((result) => {
      useLogger(
        `User registered successfully: ${result.data.user.email}`,
        "info"
      );
      res
        .status(handleStatusCode(SUCCESS.USER_REGISTERED))
        .json({ data: result.data, message: SUCCESS.USER_REGISTERED });
    })
    .catch((error) => {
      if (error instanceof Error) {
        useLogger(`Error registering user: ${error.message}`, "error");
        return res
          .status(handleStatusCode(error.message))
          .json({ error: error.message });
      }
      useLogger("Unknown error during user registration", "error");
      res
        .status(handleStatusCode("Unknown error"))
        .json({ error: "Unknown error" });
    });
};

export default {
  register,
};
