import request from "supertest";
import app from "../../src/app";
import { generateJsonWebToken } from "../../src/utils/jwt";

const newUser = {
  name: "name",
  email: "email@email.com",
  password: "password",
  passwordConfirm: "password",
  company: "company",
  wage: 10000,
};

const token =
  "Bearer " +
  generateJsonWebToken({
    name: newUser.name,
    email: newUser.email,
    company: newUser.company,
    wage: newUser.wage,
  });

describe("user integration test", () => {
  let userId: number;

  it("POST /api/users", async () => {
    const res = await request(app).post("/api/users").send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.userId).toEqual("number");

    userId = res.body.userId;
  });

  it("GET /api/users/:userId", async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(newUser.name);
  });

  it("PATCH /api/users/:userId", async () => {
    const updateUser = { company: "updated company", wage: 15000 };

    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .set("authorization", token)
      .send(updateUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body.company).toEqual(updateUser.company);
  });

  it("POST /api/users/login", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"][0].split("; ")[0]).toContain(
      "access-token"
    );
  });

  it("DELETE /api/users/:userId", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
  });
});
