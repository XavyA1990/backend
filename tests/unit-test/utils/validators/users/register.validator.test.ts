import { generateUser } from "../../../../data/mock-helper";
import { IUser } from "../../../../../src/models/user.model";
import { registerValidation } from "../../../../../src/lib/validators/users/register.validator";
import { ERRORS } from "../../../../../src/lib/constants/labels";

describe("Register User Validator", () => {
  it("should  validate a user registration with valid data", async () => {
    const userData = generateUser();
    const result = registerValidation(userData as Omit<IUser, "_id">);
    expect(result).toBe(userData);
  });

  it("should throw an error for missing required fields", () => {
    const userData = generateUser();
    userData.first_name = "";
    userData.last_name = "";
    userData.email = "";
    userData.password = "";
    expect(() => registerValidation(userData as Omit<IUser, "_id">)).toThrow(
      ERRORS.MISSING_FIELDS
    );
  });

  it("should throw an error for invalid email format", () => {
    const userData = generateUser();
    userData.email = "invalid-email";
    expect(() => registerValidation(userData as Omit<IUser, "_id">)).toThrow(
      ERRORS.INVALID_EMAIL
    );
  });

  it("should throw an error for invalid password format", () => {
    const userData = generateUser();
    userData.password = "12345";
    expect(() => registerValidation(userData as Omit<IUser, "_id">)).toThrow(
      ERRORS.INVALID_PASSWORD
    );
  });
});
