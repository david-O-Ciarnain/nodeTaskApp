import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users, Tasks } from "../../src/db/model/mongoose";

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  name: "Mike the test man",
  email: process.env.FROMEMAIL,
  password: "Im_a_test123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

export const userTwoId = new mongoose.Types.ObjectId();
export const userTwo = {
  _id: userTwoId,
  name: "Sven",
  email: "sven@example.com",
  password: "Im_a_test123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
export const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "test task1",
  completed: false,
  author: userOneId,
};

export const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "test task2",
  completed: true,
  author: userOneId,
};

export const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "test task3",
  completed: false,
  author: userTwoId,
};

export async function setupDatabase() {
  await Users.deleteMany();
  await Tasks.deleteMany();
  await new Users(userOne).save();
  await new Users(userTwo).save();

  await new Tasks(taskOne).save();
  await new Tasks(taskTwo).save();
  await new Tasks(taskThree).save();
}
