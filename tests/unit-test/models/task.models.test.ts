import Category from "../../../src/models/category.model";
import Board from "../../../src/models/board.model";
import User from "../../../src/models/user.model";
import Task from "../../../src/models/task.model";
import { generateUser, generateBoard, generateCategory, generateTask } from "../../data/mock-helper";

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
    expect(savedTask.created_at).toBeDefined();
    expect(savedTask.updated_at).toBeDefined();
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
