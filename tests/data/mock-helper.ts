import { faker } from "@faker-js/faker";
import { PASSWORD_REGEX } from "../../src/lib/constants/regex";

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