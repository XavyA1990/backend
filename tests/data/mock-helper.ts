import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { registerUser } from "../../src/services/users.service";
import { IUser } from "../../src/models/user.model";

export const generateUser = (overrides = {}) => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: `Aa1!${faker.string.alphanumeric(6)}`,
    avatar_image_url: faker.image.avatar(),
    ...overrides,
  };
};
export const generateBoard = (overrides = {}) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    owner: new Types.ObjectId(),
    members: [new Types.ObjectId()],
    ...overrides,
  };
};

export const generateCategory = (overrides = {}) => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    ...overrides,
  };
};

export const generateTask = (overrides = {}) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement([
      "todo",
      "in-progress",
      "done",
    ]),
    priority: faker.helpers.arrayElement([
      "low",
      "medium",
      "high",
    ]),
    due_date: faker.date.future(),
    ...overrides,
  };
};

export const generateMongoId = () => {
  return new Types.ObjectId()
};

export const createUser = async () => {
  const response = await registerUser(generateUser() as Omit<IUser, "_id">);

  const { user } = response.data;
  return user;
}