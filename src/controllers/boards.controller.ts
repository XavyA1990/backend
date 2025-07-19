import { Request, Response } from "express";
import { ERRORS, SUCCESS } from "../lib/constants/labels/labels";
import { IBoard } from "../models/board.model";
import { createBoard } from "../services/board.service";
import { handleStatusCode } from "../lib/helpers/status-code.helper";
import { useLogger } from "../config/plugins/logger.plugin";

const create = (req: Request, res: Response) => {
  const boardData = req.body as Omit<IBoard, "_id">;

  createBoard(boardData)
    .then((board) => {
      useLogger(SUCCESS.BOARD_CREATED, "info");
      res.status(handleStatusCode(SUCCESS.BOARD_CREATED)).json({
        data: board,
        message: SUCCESS.BOARD_CREATED,
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        useLogger(error.message, "error");
        return res
          .status(handleStatusCode(error.message))
          .json({ error: error.message });
      }
      useLogger(ERRORS.UNKNOWN_BOARD_ERROR, "error");
      res
        .status(handleStatusCode(ERRORS.UNKNOWN_BOARD_ERROR))
        .json({ error: ERRORS.UNKNOWN_BOARD_ERROR });
    });
};

export default {
  create,
};
