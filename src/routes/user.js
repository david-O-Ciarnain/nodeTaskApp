import express from "express";
import { Users } from "../db/mongoose.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
import {
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

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const user = req.user;
  const body = req.body;

  const allowedUpdates = ["name", "email", "password", "age"];

  if (!inValidUpdateInput(body, allowedUpdates)) {
    return res.status(404).send({ error: "Invalid inputs" });
  }
  try {
    Object.keys(body).forEach((update) => (user[update] = body[update]));

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(inValidUserInput(error));

    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
