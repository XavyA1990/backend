import { generateUser } from "../../helpers/mock-helper";
import {registerUser} from "../../../src/services/users.service";
import { IUser } from "../../../src/models/user.model";

describe("User Service - registerUser", () => {
    it("should register a user with valid data", async () => {
        const userData = generateUser();
        const result = await registerUser(userData as Omit<IUser, '_id'>);
        expect(result).toHaveProperty("_id");
        expect(result.first_name).toBe(userData.first_name);
        expect(result.last_name).toBe(userData.last_name);
        expect(result.email).toBe(userData.email);
        expect(result.password).toBe(userData.password);
        expect(result.avatar_image_url).toBe(userData.avatar_image_url);
    })
})