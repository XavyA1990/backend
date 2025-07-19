import { Router } from "express";
import boardsController from "../controllers/boards.controller";

const router = Router();

router.post("/", boardsController.create);

export default router;
