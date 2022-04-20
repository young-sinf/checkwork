import request from "supertest";
import app from "../../src/app";

describe("user integration test", () => {
  let userId: number;

  const newUser = {
    name: "name",
    email: "email@email.com",
    company: "company",
    wage: 10000,
  };

  it("POST /api/users", async () => {
    const res = await request(app).post("/api/users").send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.userId).toEqual("number");

    userId = res.body.userId;
  });

  it("GET /api/users/:userId", async () => {
    const res = await request(app).get(`/api/users/${userId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(newUser.name);
  });
});