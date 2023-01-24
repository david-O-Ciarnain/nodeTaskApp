import express from "express";
import { Users } from "../db/mongoose.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
import {
  inValidPatchInput,
  inValidUpdateInput,
  inValidUserInput,
} from "../errors/errorHandeling.js";

router.post("/users", async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(inValidUserInput(error));
  }
});

router.post("/users/login", async (req, res) => {
  const body = req.body;

  try {
    const user = await Users.finByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", auth, async (req, res) => {
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

router.patch("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  const allowedUpdates = ["name", "email", "password", "age"];

  if (!inValidUpdateInput(body, allowedUpdates)) {
    return res.status(404).send({ error: "Invalid inputs" });
  }
  try {
    const user = await Users.findById(_id);
    Object.keys(body).forEach((update) => (user[update] = body[update]));

    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(inValidPatchInput(error));

    res.status(500).send();
  }
});

router.delete("/users/:id", auth, async (req, res) => {
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
