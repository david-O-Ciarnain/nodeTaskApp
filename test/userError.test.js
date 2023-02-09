import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../src/app.js";
import { Users } from "../src/db/model/mongoose.js";

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Steven the test man",
  email: "Steven@example.com",
  password: "Im_a_test123",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};
beforeEach(async () => {
  await Users.deleteMany();
  await new Users(userTwo).save();
});

afterAll(async () => {
    await mongoose.connection.close()
 })

test("Should not delete account for user", async () => {
    await request(app).delete("/users/me").send().expect(401);
  });
  test("Should throw 401 unauthorized on unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
  });
  test("should not login nonexistent user", async () => {
    await request(app)
      .post("/users/login")
      .send({
        email: "batmna951@live.se",
        password: "123",
      })
      .expect(400);
  });
  test("Should not signup a new user wrong length on password", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Batman",
        email: process.env.FROMEMAIL,
        password: "123",
      })
      .expect(400);
  });
  test("Should not signup a new user wrong email format", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Batman",
        email: "Göran",
        password: "12345671",
      })
      .expect(400);
  });
  