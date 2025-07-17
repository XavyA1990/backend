import { IUser } from "../../src/models/user.model";
import { boardsMock } from "../data/mocks/board.mock";
import { categoriesMock } from "../data/mocks/category.mock";
import { tasksMock } from "../data/mocks/task.mock";
import { usersMock } from "../data/mocks/users.mock";

export const generateUser = (overrides = {}) => {
  const randomUser = usersMock[Math.floor(Math.random() * usersMock.length)];
  return {
    first_name: randomUser.first_name,
    last_name: randomUser.last_name,
    email: randomUser.email,
    password: randomUser.password,
    avatar_image_url: randomUser.avatar_img_url || "",
    ...overrides,
  };
};
export const generateBoard = (overrides = {}) => {
  const randomBoard = boardsMock[Math.floor(Math.random() * boardsMock.length)];
  return {
    title: randomBoard.title,
    description: randomBoard.description,
    ...overrides,
  };
};

export const generateCategory = (overrides = {}) => {
  const randomCategory =
    categoriesMock[Math.floor(Math.random() * categoriesMock.length)];
  return {
    name: randomCategory.name,
    description: randomCategory.description,
    ...overrides,
  };
};

export const generateTask = (overrides = {}) => {
  const randomTask = tasksMock[Math.floor(Math.random() * tasksMock.length)];
  return {
    title: randomTask.title,
    description: randomTask.description,
    status: randomTask.status,
    due_date: randomTask.dueDate,
    ...overrides,
  };
};