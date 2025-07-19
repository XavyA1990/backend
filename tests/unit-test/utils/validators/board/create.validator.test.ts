import { createBoardValidation } from "../../../../../src/lib/validators/board/create.validator";
import { generateBoard } from '../../../../data/mock-helper';

describe("Board Create Validator", () => {
  it("should validate board creation data", () => {
    const generateBoardData = generateBoard();
    const validBoardData = createBoardValidation(generateBoardData);
    expect(validBoardData).toEqual(generateBoardData);
  });
});