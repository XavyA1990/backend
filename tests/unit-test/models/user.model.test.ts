import User from "../../../src/models/user.model";
import { generateUser } from "../../data/mock-helper";

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
    expect(savedUser.created_at).toEqual(expect.any(Date));
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
