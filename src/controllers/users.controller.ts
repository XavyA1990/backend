import { Request, Response } from "express";
import { IUser, parserUser } from "../models/user.model";
import { loginUser, registerUser, updateUser } from "../services/users.service";
import { SUCCESS } from "../lib/constants/labels";
import { useLogger } from "../config/plugins/logger.plugin";
import { handleStatusCode } from "../lib/helpers/status-code.helper";
import { Types } from "mongoose";

const register = (req: Request, res: Response) => {
  const userData = req.body as Omit<IUser, "_id">;

  const avatarImagePublicPath = req.file?.path.split("public")[1];

  registerUser({ ...userData, avatar_image_url: avatarImagePublicPath })
    .then((result) => {
      const { user, token } = result.data;
      useLogger(`User registered successfully: ${user.email}`, "info");
      res.status(handleStatusCode(SUCCESS.USER_REGISTERED)).json({
        data: { user: parserUser(user), token },
        message: SUCCESS.USER_REGISTERED,
      });
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

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  loginUser(email, password)
    .then((result) => {
      const { user, token } = result.data;
      useLogger(`User logged in successfully: ${user.email}`, "info");
      res
        .status(handleStatusCode(SUCCESS.USER_LOGGED_IN))
        .json({
          data: { user: parserUser(user), token },
          message: SUCCESS.USER_LOGGED_IN,
        });
    })
    .catch((error) => {
      if (error instanceof Error) {
        useLogger(`Error logging in user: ${error.message}`, "error");
        return res
          .status(handleStatusCode(error.message))
          .json({ error: error.message });
      }
      useLogger("Unknown error during user login", "error");
      res.status(500).json({ error: "Unknown error" });
    });
};

const update = (req: Request, res: Response) => {
  const userId = req.params.id as unknown as Types.ObjectId;
  const userData = req.body as Partial<IUser>;
  const avatarImagePublicPath = req.file?.path.split("public")[1];
  const updatedData = {
    ...userData,
    avatar_image_url: avatarImagePublicPath,
  };
  updateUser(userId, updatedData, req.body.confirm_password)
    .then((result) => {
      useLogger(`User updated successfully: ${result.data.email}`, "info");
      res.status(handleStatusCode(SUCCESS.USER_UPDATED)).json({
        data: { user: parserUser(result.data) },
        message: SUCCESS.USER_UPDATED,
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        useLogger(`Error updating user: ${error.message}`, "error");
        return res
          .status(handleStatusCode(error.message))
          .json({ error: error.message });
      }
      useLogger("Unknown error during user update", "error");
      res.status(500).json({ error: "Unknown error" });
    });
};

export default {
  register,
  login,
  update,
};
