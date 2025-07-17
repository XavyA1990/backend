import { usersMock } from "../../data/mocks/users.mock";
import { categoriesMock } from "../../data/mocks/category.mock";
import { boardsMock } from "../../data/mocks/board.mock";
import Category from "../../../src/models/category.model";
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

const generateCategory = (overrides = {}) => {
  const randomCategory =
    categoriesMock[Math.floor(Math.random() * categoriesMock.length)];
  return {
    name: randomCategory.name,
    description: randomCategory.description,
    ...overrides,
  };
};

describe("Category Model", () => {
  it("should create a category with valid data", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const category = await new Category(
      generateCategory({ board: board._id })
    ).save();

    expect(category).toHaveProperty("_id");
    expect(category.name).toBeDefined();
    expect(category.description).toBeDefined();
    expect(category.board.toString()).toBe(board._id.toString());
    expect(category.order).toBeDefined();
    expect(category.createdAt).toBeDefined();
    expect(category.updatedAt).toBeDefined();
  });

  it("should not create a category without required fields", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const categoryData = generateCategory({ name: "", board: board._id });
    const category = new Category(categoryData);

    await expect(category.save()).rejects.toThrow();
  });

  it("should have a unique order for each category", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const category1 = await new Category(
      generateCategory({ board: board._id })
    ).save();
    const category2 = await new Category(
      generateCategory({ board: board._id })
    ).save();

    expect(category1.order).not.toBe(category2.order);
  });
});
