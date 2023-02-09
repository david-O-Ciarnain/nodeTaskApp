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

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Batman",
      email: process.env.FROMEMAIL,
      password: "1234567",
    })
    .expect(201);

  // Assert thatthe database was changed correctly
  const user = await Users.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Batman",
      email: process.env.FROMEMAIL,
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("1234567");
});
test("Should login exisitng user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await Users.findById(userOneId);
  expect(user).not.toBeNull();

  expect(response.body.token).toBe(user.tokens[1].token);
});
test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
test("Should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await Users.findById(userOneId);
  expect(user).toBeNull();
});
