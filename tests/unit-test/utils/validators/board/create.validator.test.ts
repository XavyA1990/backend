import { ERRORS } from "../../../../../src/lib/constants/labels/labels";
import { createBoardValidation } from "../../../../../src/lib/validators/board/create.validator";
import { generateBoard, generateUser } from '../../../../data/mock-helper';
import { registerUser } from '../../../../../src/services/users.service';
import { IUser } from "../../../../../src/models/user.model";

describe("Board Create Validator", () => {
  it("should validate board creation data", () => {
    const generateBoardData = generateBoard();
    const validBoardData = createBoardValidation(generateBoardData);
    expect(validBoardData).toEqual(generateBoardData);
  });
    it("should throw error for missing title", () => {
        const boardData = generateBoard({ title: "" });
        expect(() => createBoardValidation(boardData)).toThrow(ERRORS.MISSING_TITLE);

    });
    it("should throw error for invalid owner ID", () => {
        const boardData = generateBoard({ owner: "invalidOwnerId" });
        expect(() => createBoardValidation(boardData)).toThrow(ERRORS.INVALID_OWNER_ID);
    });
    it("should throw error for invalid member ID", async () => {
        const ownerData = generateUser();
        const owner = await registerUser(ownerData as Omit<IUser, "_id">);
        const boardData = generateBoard({ members: ["invalidMemberId"], owner: owner.data.user._id });
        expect(() => createBoardValidation(boardData)).toThrow(ERRORS.INVALID_MEMBER_ID);
    });
    it("should throw error for member being the same as owner", async () => {
        const ownerData = generateUser();
        const owner = await registerUser(ownerData as Omit<IUser, "_id">);
        const boardData = generateBoard({ members: [owner.data.user._id], owner: owner.data.user._id });
        expect(() => createBoardValidation(boardData)).toThrow(ERRORS.MEMBER_CANNOT_BE_OWNER);
    });
    it("should throw error for non-unique members", async () => {
        const ownerData = generateUser();
        const owner = await registerUser(ownerData as Omit<IUser, "_id">);
        const memberData = generateUser();
        const member = await registerUser(memberData as Omit<IUser, "_id">);
        const boardData = generateBoard({ members: [member.data.user._id, member.data.user._id], owner: owner.data.user._id });
        expect(() => createBoardValidation(boardData)).toThrow(ERRORS.MEMBERS_MUST_BE_UNIQUE);
    });
});