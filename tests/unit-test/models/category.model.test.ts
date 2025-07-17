import Category from "../../../src/models/category.model";
import Board from "../../../src/models/board.model";
import User from "../../../src/models/user.model";
import { generateUser, generateBoard, generateCategory } from "../../data/mock-helper";

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
    expect(category.created_at).toBeDefined();
    expect(category.updated_at).toBeDefined();
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
