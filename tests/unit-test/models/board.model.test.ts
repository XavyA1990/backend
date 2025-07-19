import Board from "../../../src/models/board.model";
import User from "../../../src/models/user.model";
import { generateUser, generateBoard } from "../../data/mock-helper";

describe("Board Model", () => {
  it("should create a board with valid data", async () => {
    const user = generateUser();
    const newUser = await new User(user).save();
    const boardData = generateBoard({ owner: newUser._id, members: [] });
    const board = new Board(boardData);
    const savedBoard = await board.save();

    expect(savedBoard).toHaveProperty("_id");
    expect(savedBoard.title).toBe(boardData.title);
    expect(savedBoard.description).toBe(boardData.description);
    expect(savedBoard.owner.toString()).toBe(newUser._id.toString());
    expect(savedBoard.members).toEqual([]);
    expect(savedBoard.created_at).toBeDefined();
    expect(savedBoard.updated_at).toBeDefined();
  });

  it("should not create a board with more than 2 members and owner", async () => {
    const user = generateUser();
    const newUser = await new User(user).save();
    const member1 = generateUser();
    const member2 = generateUser();
    const newMember1 = await new User(member1).save();
    const newMember2 = await new User(member2).save();
    const boardData = generateBoard({ owner: newUser._id, members: [newMember1._id, newMember2._id] });
    const board = new Board(boardData);
    const savedBoard = await board.save();

    expect(savedBoard.members.length).toBe(2);
    expect(savedBoard.members).toContain(newMember1._id);
    expect(savedBoard.members).toContain(newMember2._id);
  });

  it("should not create a board with a duplicate member or owner", async () => {
    const user = generateUser();
    const newUser = await new User(user).save();
    const boardData = generateBoard({ owner: newUser._id, members: [newUser._id, newUser._id] });
    const board = new Board(boardData);
    await expect(board.save()).rejects.toThrow(
      "Member cannot be the same as the owner"
    );
  });

  it("should not create a board with duplicate members", async () => {
    const user = generateUser();
    const owner = await new User(user).save();
    const member = await new User(generateUser()).save();
    const boardData = generateBoard({ owner: owner._id });
    const board = new Board(boardData);
    board.members.push(member._id);
    board.members.push(member._id);
    await expect(board.save()).rejects.toThrow("Members must be unique");
  });
});
