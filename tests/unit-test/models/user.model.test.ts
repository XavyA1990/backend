import { usersMock } from "../../data/mocks/users.mock";
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

describe("User Model", () => {
  it("should create a user with valid data", async () => {
    const userData = generateUser();
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.first_name).toBe(userData.first_name);
    expect(savedUser.last_name).toBe(userData.last_name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdAt).toEqual(expect.any(Date));
    expect(savedUser.avatar_image_url).toBe(userData.avatar_image_url);
  });

  it("should not create a user without required fields", async () => {
    const userData = generateUser({ first_name: "", email: "" });
    const user = new User(userData);

    await expect(user.save()).rejects.toThrow();
  });

  it("should not create a user with an invalid email", async () => {
    const userData = generateUser({ email: "invalid-email" });
    const user = new User(userData);

    await expect(user.save()).rejects.toThrow();
  });

  it("should not create a user with a duplicate email", async () => {
    const userData = generateUser();
    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrow();
  });
});
