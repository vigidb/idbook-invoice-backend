const request = require("supertest");
const app = require("../app");
describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpassword" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });
  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpassword" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
