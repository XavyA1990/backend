import { Router } from "express";

import usersController from "../controllers/users.controller";

const router = Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);

export default router;
