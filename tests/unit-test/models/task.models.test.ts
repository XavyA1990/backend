import { usersMock } from "../../data/mocks/users.mock";
import { categoriesMock } from "../../data/mocks/category.mock";
import { boardsMock } from "../../data/mocks/board.mock";
import { tasksMock } from "../../data/mocks/task.mock";
import Category from "../../../src/models/category.model";
import Board from "../../../src/models/board.model";
import User from "../../../src/models/user.model";
import Task from "../../../src/models/task.model";

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

const generateTask = (overrides = {}) => {
  const randomTask = tasksMock[Math.floor(Math.random() * tasksMock.length)];
  return {
    title: randomTask.title,
    description: randomTask.description,
    status: randomTask.status,
    due_date: randomTask.dueDate,
    ...overrides,
  };
};

describe("Task Model", () => {
  it("should create a task with valid data", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const category = await new Category(
      generateCategory({ board: board._id })
    ).save();
    const taskData = generateTask({
      category: category._id,
      assignee: user._id,
    });
    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask).toHaveProperty("_id");
    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
    expect(savedTask.status).toBe(taskData.status);
    expect(savedTask.category.toString()).toBe(category._id.toString());
    expect(savedTask.assignee?.toString()).toBe(user._id.toString());
    expect(savedTask.createdAt).toBeDefined();
    expect(savedTask.updatedAt).toBeDefined();
  });

  it("should not create a task without required fields", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const category = await new Category(
      generateCategory({ board: board._id })
    ).save();
    const taskData = generateTask({ title: "", category: category._id });
    const task = new Task(taskData);

    await expect(task.save()).rejects.toThrow();
  });

  it("should not create a task with same order", async () => {
    const user = await new User(generateUser()).save();
    const board = await new Board(generateBoard({ owner: user._id })).save();
    const category = await new Category(
      generateCategory({ board: board._id })
    ).save();
    const task1 = await new Task(
      generateTask({ category: category._id, assignee: user._id })
    ).save();
    const task2 = await new Task(
      generateTask({ category: category._id, assignee: user._id })
    ).save();

    expect(task1.order).not.toBe(task2.order);
  });
});
