import { boardsMock } from "../../data/mocks/board.mock";
import { usersMock } from "../../data/mocks/users.mock";
import Board from "../../../src/models/board.model";
import User from "../../../src/models/user.model";

const generateUser = (overrides = {}) => {
  const randomUser = usersMock[Math.floor(Math.random() * usersMock.length)];
  return {
    first_name: randomUser.first_name,
    last_name: randomUser.last_name,
    email: randomUser.email,
    password: randomUser.password,
    created_at: randomUser.created_at || new Date(),
    avatar_image_url: randomUser.avatar_img_url || "",
    ...overrides,
  };
};
const generateBoard = (overrides = {}) => {
  const randomBoard = boardsMock[Math.floor(Math.random() * boardsMock.length)];
  return {
    title: randomBoard.title,
    description: randomBoard.description,
    ...overrides,
  };
};

describe("Board Model", () => {
  it("should create a board with valid data", async () => {
    const user = generateUser();
    const newUser = await new User(user).save();
    const boardData = generateBoard({ owner: newUser._id });
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
    const boardData = generateBoard({ owner: newUser._id });
    const board = new Board(boardData);
    board.members.push(newMember1._id);
    board.members.push(newMember2._id);
    const savedBoard = await board.save();

    expect(savedBoard.members.length).toBe(2);
    expect(savedBoard.members).toContain(newMember1._id);
    expect(savedBoard.members).toContain(newMember2._id);
  });

  it("should not create a board with a duplicate member or owner", async () => {
    const user = generateUser();
    const newUser = await new User(user).save();
    const boardData = generateBoard({ owner: newUser._id });
    const board = new Board(boardData);
    board.members.push(newUser._id);
    board.members.push(newUser._id);

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
