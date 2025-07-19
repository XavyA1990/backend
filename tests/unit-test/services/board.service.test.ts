import { createUser, generateBoard } from "../../data/mock-helper";
import { createBoard } from "../../../src/services/board.service";
import { IBoard } from "../../../src/models/board.model";

describe("Board Service - createBoard", () => {
  it("should create a new board without members", async () => {
    const boardData = generateBoard({ owner: (await createUser())._id, members: [] });
    const board = await createBoard(boardData as Omit<IBoard, "_id">);
    expect(board).toBeTruthy();
    expect(board).toHaveProperty("_id");
    expect(board).toHaveProperty("title", boardData.title);
    expect(board).toHaveProperty("owner", boardData.owner);
    expect(board).toHaveProperty("members", []);
    expect(board).toHaveProperty("description", boardData.description);
    expect(board).toHaveProperty("created_at");
    expect(board).toHaveProperty("updated_at");
  });

  it("should create a new board with members", async () => {
    const owner = (await createUser())._id;
    const member1 = (await createUser())._id;
    const member2 = (await createUser())._id;

    const boardData = generateBoard({
      owner,
      members: [member1, member2],
    });

    const board = await createBoard(boardData as Omit<IBoard, "_id">);
    expect(board).toBeTruthy();
    expect(board).toHaveProperty("_id");
    expect(board).toHaveProperty("title", boardData.title);
    expect(board).toHaveProperty("owner", owner);
    expect(board.members).toContainEqual(member1);
    expect(board.members).toContainEqual(member2);
  });
});
