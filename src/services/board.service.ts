import { ERRORS } from "../lib/constants/labels/labels";
import { createBoardValidation } from "../lib/validators/board/create.validator";
import Board, { IBoard } from "../models/board.model";

export const createBoard = async (boardData: Omit<IBoard, "_id">) => {
  try {
    const validatedBoardData = createBoardValidation(boardData);
    const board = new Board(validatedBoardData);
    await board.save();
    return board;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERRORS.UNKNOWN_BOARD_ERROR);
  }
};
