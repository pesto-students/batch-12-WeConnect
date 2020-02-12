import request from "supertest";
import db from "../db";
import app from "../app";

describe("Testing the root path", () => {
  beforeAll(() => {
    return db.dbConnect();
  });
  test("It should response the GET method for root path", async () => {
    const res = await request(app).get("/api/");
    expect(res.statusCode).toEqual(200);
  });
  afterAll(() => {
    return db.dbDisconnect();
  });
});
