import { generateUser } from "../../../../data/mock-helper";
import { loginValidation } from '../../../../../src/lib/validators/users/login.validator';
import { ERRORS } from "../../../../../src/lib/constants/labels";

describe("login validator", () => {
    it("should validate a user login with valid data", () => {
        const userData = generateUser();
        const result = loginValidation(userData.email, userData.password);
        expect(result).toEqual({ email: userData.email, password: userData.password });
    });

    it("should throw an error for missing email or password", () => {
        const userData = generateUser();
        userData.email = "";
        expect(() => loginValidation(userData.email, userData.password)).toThrow(ERRORS.MISSING_FIELDS);
    });

    it("should throw an error for invalid email format", () => {
        const userData = generateUser();
        userData.email = "invalid-email";
        expect(() => loginValidation(userData.email, userData.password)).toThrow(ERRORS.INVALID_EMAIL);
    });

    it("should throw an error for invalid password format", () => {
        const userData = generateUser();
        userData.password = "12345";
        expect(() => loginValidation(userData.email, userData.password)).toThrow(ERRORS.INVALID_PASSWORD);
    });
});