import express from "express";
import { Users } from "../db/mongoose.js";
const router = express.Router();
import {
  inValidUpdateInput,
  inValidUserInput,
} from "../errors/errorHandeling.js";

router.post("/users", async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(inValidUserInput(error));
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  const allowedUpdates = ["name", "email", "password", "age"];

  if (!inValidUpdateInput(body, allowedUpdates)) {
    return res.status(404).send({ error: "Invalid inputs" });
  }
  try {
    const user = await Users.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(inValidUserInput(error));

    res.status(500).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
