import { Router } from "express";

import usersController from "../controllers/users.controller";
import upload from "../middlewares/image-upload.middleware";

const router = Router();

router.post("/register",[upload.single("avatar")],usersController.register);
router.post("/login", usersController.login);

export default router;
