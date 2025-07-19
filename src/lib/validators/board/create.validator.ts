import { Types } from "mongoose";
import { IBoard } from "../../../models/board.model";
import { ERRORS } from "../../constants/labels/labels";

export const createBoardValidation = (boardData: Partial<IBoard>) => {
  const { title, owner } = boardData;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error(ERRORS.MISSING_TITLE);
  }

  if (!owner || !Types.ObjectId.isValid(owner)) {
    throw new Error(ERRORS.INVALID_OWNER_ID);
  }

  return boardData;
};
