import request from "supertest";
import { Tasks } from "../src/db/model/mongoose";
import {
  userOne,
  userOneId,
  setupDatabase,
  taskOne,
  userTwo,
} from "./fixtures/db.js";
import app from "../src/app.js";
import mongoose from "mongoose";
beforeEach(setupDatabase);

afterAll(async () => {
  await mongoose.connection.close();
});
test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From test",
    })
    .expect(201);
  const task = await Tasks.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should return all user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should not delete tasks not author", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Tasks.findById(taskOne._id);
  expect(task).not.toBeNull();
});
