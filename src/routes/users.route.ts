import { Router } from "express";

import usersController from "../controllers/users.controller";

const router = Router();

router.post("/register", usersController.register);

export default router;
