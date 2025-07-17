import { ERRORS, SUCCESS } from "../../src/lib/constants/labels";
import request from "supertest";
import app from "../../src/app/app";
import { generateUser } from "../data/mock-helper";
import { IUser } from "../../src/models/user.model";

describe("POST /api/v1/users/register", () => {
  it("should register a user successfully", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(generateUser() as Omit<IUser, "_id">);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: expect.any(Object),
      message: SUCCESS.USER_REGISTERED,
    });
  });

  it("should return an error if user already exists", async () => {
    const userData = generateUser() as Omit<IUser, "_id">;
    await request(app).post("/api/v1/users/register").send(userData);
    
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(userData);
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: ERRORS.USER_EXISTS,
    });
  });
});
