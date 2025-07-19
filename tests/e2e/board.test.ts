import { ERRORS, SUCCESS } from "../../src/lib/constants/labels/labels";
import request from "supertest";
import app from "../../src/app/app";
import { generateBoard, generateUser } from "../data/mock-helper";
import { registerUser } from "../../src/services/users.service";
import { IUser } from "../../src/models/user.model";

describe("POST /api/v1/boards", () => {
  it("should create a new board with valid data", async () => {
    const ownerData = generateUser();
    const member1Data = generateUser();
    const member2Data = generateUser();
    const owner = await registerUser(ownerData as Omit<IUser, "_id">);
    const member1 = await registerUser(member1Data as Omit<IUser, "_id">);
    const member2 = await registerUser(member2Data as Omit<IUser, "_id">);

    const boardData = generateBoard({ owner: owner.data.user._id, members: [member1.data.user._id, member2.data.user._id] });

    const response = await request(app).post("/api/v1/boards").send(boardData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.title).toBe(boardData.title);
    expect(response.body.data.owner.toString()).toBe(owner.data.user._id.toString());
    expect(response.body.data.members).toStrictEqual([member1.data.user._id.toString(), member2.data.user._id.toString()]);
    expect(response.body.data.description).toBe(boardData.description);
    expect(response.body.message).toBe(SUCCESS.BOARD_CREATED);
  });
});
