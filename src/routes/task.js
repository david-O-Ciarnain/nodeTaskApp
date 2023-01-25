import { Router } from "express";
import { Tasks } from "../db/mongoose.js";
import { auth } from "../middleware/auth.js";
import {
  inValidTaskInput,
  inValidUpdateInput,
} from "../errors/errorHandeling.js";

const router = Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Tasks({
    ...req.body,
    author: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(inValidTaskInput(error));
  }
});

router.get("/tasks", auth, async (req, res) => {
  const author = req.user._id;
  try {
    const task = await Tasks.find({ author });
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const author = req.user._id;
  try {
    const task = await Tasks.findOne({ _id, author });
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  const allowedUpdates = ["description", "completed"];

  if (!inValidUpdateInput(body, allowedUpdates)) {
    return res.status(400).send({ error: "Ivalid inputs" });
  }

  try {
    const task = await Tasks.findById(_id);

    Object.keys(body).forEach((update) => (task[update] = body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(inValidTaskInput(error));
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const tasks = await Tasks.findByIdAndDelete(id);

    if (!tasks) {
      return res.status(404).send();
    }

    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
