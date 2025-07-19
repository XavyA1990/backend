import { Types } from "mongoose";
import { IBoard } from "../../../models/board.model";
import { ERRORS } from "../../constants/labels/labels";

export const createBoardValidation = (boardData: Partial<IBoard>) => {
  const { title, owner, members } = boardData;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error(ERRORS.MISSING_TITLE);
  }

  if (!owner || !Types.ObjectId.isValid(owner)) {
    throw new Error(ERRORS.INVALID_OWNER_ID);
  }

  if (members && members.length > 0) {
    members.forEach((member) => {
      if (!Types.ObjectId.isValid(member)) {
        throw new Error(ERRORS.INVALID_MEMBER_ID);
      }

      if (member === owner) {
        throw new Error(ERRORS.MEMBER_CANNOT_BE_OWNER);
      }
    });

    const uniqueMembers = new Set(members);
    if (uniqueMembers.size !== members.length) {
      throw new Error(ERRORS.MEMBERS_MUST_BE_UNIQUE);
    }
  }

  return boardData;
};
