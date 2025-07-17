import { generateUser } from "../../helpers/mock-helper";
import {registerUser} from "../../../src/services/users.service";
import { IUser } from "../../../src/models/user.model";

describe("User Service - registerUser", () => {
    it("should register a user with valid data", async () => {
        const userData = generateUser();
        const result = await registerUser(userData as Omit<IUser, '_id'>);
        expect(result.data.user).toHaveProperty("_id");
        expect(result.data.user.first_name).toBe(userData.first_name);
        expect(result.data.user.last_name).toBe(userData.last_name);
        expect(result.data.user.email).toBe(userData.email);
        expect(result.data.user.password).toBeDefined();
        expect(result.data.user.avatar_image_url).toBe(userData.avatar_image_url);
        expect(result.data.token).toBeDefined();
    })

    it("should return a password hash instead of plain text password", async () => {
        const userData = generateUser();
        const result = await registerUser(userData as Omit<IUser, '_id'>);
        expect(result.data.user.password).not.toBe(userData.password);
        expect(result.data.user.password).toMatch(/^\$2[ayb]\$.{56}$/);
    })
})