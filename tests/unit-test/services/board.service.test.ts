import { generateBoard, generateUser } from "../../data/mock-helper";
import { createBoard } from "../../../src/services/board.service";
import { IBoard } from "../../../src/models/board.model";
import { IUser } from "../../../src/models/user.model";
import { registerUser } from "../../../src/services/users.service";

describe("Board Service - createBoard", () => {
  it("should create a new board without members", async () => {
    // const boardData = generateBoard({ owner: (await createUser())._id, members: [] });
    const ownerData = generateUser();
    const owner = await registerUser(ownerData as Omit<IUser, "_id">); 
    const boardData = generateBoard({
      owner: owner.data.user._id,
      members: [],
    });
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
    const ownerData = generateUser();
    const member1Data = generateUser();
    const member2Data = generateUser();
    const owner = await registerUser(ownerData as Omit<IUser, "_id">);
    const member1 = await registerUser(member1Data as Omit<IUser, "_id">);
    const member2 = await registerUser(member2Data as Omit<IUser, "_id">);

    const boardData = generateBoard({
      owner: owner.data.user._id,
      members: [member1.data.user._id, member2.data.user._id],
    });

    const board = await createBoard(boardData as Omit<IBoard, "_id">);
    expect(board).toBeTruthy();
    expect(board).toHaveProperty("_id");
    expect(board).toHaveProperty("title", boardData.title);
    expect(board).toHaveProperty("owner", owner.data.user._id);
    expect(board.members).toContainEqual(member1.data.user._id);
    expect(board.members).toContainEqual(member2.data.user._id);
  });
});
