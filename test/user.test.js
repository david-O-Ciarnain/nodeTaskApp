import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../src/app.js";
import { Users } from "../src/db/model/mongoose.js";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike the test man",
  email: "mike@example.com",
  password: "Im_a_test123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
beforeEach(async () => {
  await Users.deleteMany();
  await new Users(userOne).save();
});
test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Batman",
      email: process.env.FROMEMAIL,
      password: "1234567",
    })
    .expect(201);
});
test("Should login exisitng user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
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
