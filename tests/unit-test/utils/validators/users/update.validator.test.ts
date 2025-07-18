import { Types } from "mongoose";
import { ERRORS } from "../../../../../src/lib/constants/labels";
import { updateValidation } from "../../../../../src/lib/validators/users/update.validator";
import { generateMongoId, generateUser } from "../../../../data/mock-helper";

describe("updateUserValidation", () => {
  it("should validate user data with valid input", () => {
    const data = {
      first_name: generateUser().first_name,
      last_name: generateUser().last_name,
      email: generateUser().email,
    };
    const result = updateValidation(data, generateMongoId());
    expect(result).toEqual(data);
  });

  it("should throw an error if passwords do not match", () => {
    const user = generateUser();
    expect(() =>
      updateValidation(user, generateMongoId(), generateUser().password)
    ).toThrow(ERRORS.PASSWORD_DOES_NOT_MATCH);
  });
  it("should throw an error for invalid email format", () => {
    const data = { email: "invalidEmail" };
    expect(() => updateValidation(data, generateMongoId())).toThrow(
      ERRORS.INVALID_EMAIL
    );
  });
  it("should throw an error for invalid password format", () => {
    const user = generateUser();
    user.password = "short";
    expect(() => updateValidation(user, generateMongoId())).toThrow(
      ERRORS.INVALID_PASSWORD
    );
  });

  it("should throw an error for missing confirm password when password is provided", () => {
    const user = generateUser();
    expect(() => updateValidation(user, generateMongoId(), undefined)).toThrow(
      ERRORS.MISSING_FIELDS
    );
  });
  it("should throw an error for invalid user ID", () => {
    expect(() =>
      updateValidation(generateUser(), "invalid-id" as unknown as Types.ObjectId)
    ).toThrow(ERRORS.INVALID_USER_ID);
  });
});
