import { generateMongoId, generateUser } from "../../data/mock-helper";
import {
  getUserByEmail,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../../../src/services/users.service";
import { IUser } from "../../../src/models/user.model";
import { ERRORS } from "../../../src/lib/constants/labels/labels";

describe("User Service - registerUser", () => {
  it("should register a user with valid data", async () => {
    const userData = generateUser();
    const result = await registerUser(userData as Omit<IUser, "_id">);
    expect(result.data.user).toHaveProperty("_id");
    expect(result.data.user.first_name).toBe(userData.first_name);
    expect(result.data.user.last_name).toBe(userData.last_name);
    expect(result.data.user.email).toBe(userData.email);
    expect(result.data.user.password).toBeDefined();
    expect(result.data.user.avatar_image_url).toBe(userData.avatar_image_url);
    expect(result.data.token).toBeDefined();
  });

  it("should return a password hash instead of plain text password", async () => {
    const userData = generateUser();
    const result = await registerUser(userData as Omit<IUser, "_id">);
    expect(result.data.user.password).not.toBe(userData.password);
    expect(result.data.user.password).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it("should throw an error for invalid user data", async () => {
    const invalidUserData = {
      first_name: "",
      last_name: "Doe",
      email: "",
      password: "12345",
    };
    await expect(
      registerUser(invalidUserData as Omit<IUser, "_id">)
    ).rejects.toThrow(ERRORS.MISSING_FIELDS);
  });

  it("should throw an error if user with the same email already exists", async () => {
    const userData = generateUser();
    await registerUser(userData as Omit<IUser, "_id">);
    await expect(registerUser(userData as Omit<IUser, "_id">)).rejects.toThrow(
      ERRORS.USER_EXISTS
    );
  });

  it("should find a user by email", async () => {
    const userData = generateUser();
    await registerUser(userData as Omit<IUser, "_id">);
    const foundUser = await getUserByEmail(userData.email);
    expect(foundUser).toBeDefined();
    expect(foundUser!.email).toBe(userData.email);
  });
});

describe("User Service - loginUser", () => {
  it("should login a user with valid credentials", async () => {
    const userData = generateUser();
    await registerUser(userData as Omit<IUser, "_id">);
    const result = await loginUser(userData.email, userData.password);
    expect(result.data.user).toHaveProperty("_id");
    expect(result.data.user.first_name).toBe(userData.first_name);
    expect(result.data.user.last_name).toBe(userData.last_name);
    expect(result.data.user.email).toBe(userData.email);
    expect(result.data.token).toBeDefined();
  });

  it("should throw an error for invalid email", async () => {
    await expect(
      loginUser("invalid@example.com", generateUser().password)
    ).rejects.toThrow(ERRORS.USER_NOT_FOUND);
  });

  it("should throw an error for invalid password", async () => {
    const userData = generateUser();
    await registerUser(userData as Omit<IUser, "_id">);
    await expect(loginUser(userData.email, "wrongpassword")).rejects.toThrow(
      ERRORS.INVALID_PASSWORD
    );
  });
});

describe("User Service - getUserById", () => {
  it("should return a user for a valid id", async () => {
    const userData = generateUser();
    const registerResult = await registerUser(userData as Omit<IUser, "_id">);
    const userId = registerResult.data.user._id;

    const foundUser = await getUserById(userId);
    expect(foundUser).toBeDefined();
    expect(foundUser.email).toBe(userData.email);
  });

  it("should throw an error for an invalid id", async () => {
    await expect(getUserById(generateMongoId())).rejects.toThrow(
      ERRORS.USER_NOT_FOUND
    );
  });
});

describe("User Service - updateUser", () => {
  it("should update a user with valid data", async () => {
    const userData = generateUser();
    const registerResult = await registerUser(userData as Omit<IUser, "_id">);
    const userId = registerResult.data.user._id;

    const updatedData = {
      first_name: generateUser().first_name,
      last_name: generateUser().last_name,
    };
    const result = await updateUser(userId, updatedData);
    expect(result.data.first_name).toBe(updatedData.first_name);
    expect(result.data.last_name).toBe(updatedData.last_name);
    expect(result.data.email).toBe(userData.email);
  });

  it("should throw an error for an invalid user id", async () => {
    await expect(updateUser(generateMongoId(), {})).rejects.toThrow(
      ERRORS.USER_NOT_FOUND
    );
  });

  it("should change the password if provided", async () => {
    const userData = generateUser();
    const registerResult = await registerUser(userData as Omit<IUser, "_id">);
    const userId = registerResult.data.user._id;

    const newPassword = generateUser().password;
    const result = await updateUser(userId, { password: newPassword }, newPassword);
    expect(result.data.password).not.toBe(newPassword);
    expect(result.data.password).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it("should throw an error for invalid user data", async () => {
    const userData = generateUser();
    const registerResult = await registerUser(userData as Omit<IUser, "_id">);
    const userId = registerResult.data.user._id;

    await expect(updateUser(userId, { email: "invalidEmail" })).rejects.toThrow(
      ERRORS.INVALID_EMAIL
    );
  });

  it("should throw an error if passwords do not match", async () => {
    const userData = generateUser();
    const registerResult = await registerUser(userData as Omit<IUser, "_id">);
    const userId = registerResult.data.user._id;

    await expect(
      updateUser(
        userId,
        { password: generateUser().password },
        generateUser().password
      )
    ).rejects.toThrow(ERRORS.PASSWORD_DOES_NOT_MATCH);
  });
});
