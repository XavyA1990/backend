import { generateUser } from "../../../../data/mock-helper";
import { IUser } from "../../../../../src/models/user.model";
import userValidation from "../../../../../src/lib/validators/users/register.validator";

describe("Register User Validator", () => {
  it("should  validate a user registration with valid data", async () => {
    const userData = generateUser();
    const result = userValidation(userData as Omit<IUser, "_id">);
    expect(result).toBe(userData);
  });

  it("should throw an error for missing required fields", () => {
    const userData = generateUser();
    userData.first_name = "";
    userData.last_name = "";
    userData.email = "";
    userData.password = "";
    expect(() => userValidation(userData as Omit<IUser, "_id">)).toThrow(
      "Missing required user fields"
    );
  });

  it("should throw an error for invalid email format", () => {
    const userData = generateUser();
    userData.email = "invalid-email";
    expect(() => userValidation(userData as Omit<IUser, "_id">)).toThrow(
      "Invalid email format"
    );
  });

  it("should throw an error for invalid password format", () => {
    const userData = generateUser();
    userData.password = "12345";
    expect(() => userValidation(userData as Omit<IUser, "_id">)).toThrow(
      "Invalid password format"
    );
  });
});
