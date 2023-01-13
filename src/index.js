import express from "express";
import { Tasks, Users } from "./db/mongoose.js";
import { inValidTaskInput } from "./errors/taskErrorHandeling.js";
import { inValidUserInput } from "./errors/userErrorHandeling.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//** USER ENDPOINTS **//

app.post("/users", async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(inValidUserInput(error));
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
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

app.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = Object.keys(body).every((allowed) =>
    allowedUpdates.includes(allowed)
  );

  if (!isValidOperation) {
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

//** TASK ENDPOINTS **//

app.post("/tasks", async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(inValidTaskInput(error));
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const task = await Tasks.find({});
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Tasks.findById(_id);
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  const allowedUpdates = ["description", "completed"];

  const isValidOperation = Object.keys(body).every((allowed) =>
    allowedUpdates.includes(allowed)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Ivalid inputs" });
  }

  try {
    const task = await Tasks.findByIdAndUpdate(_id, body, {
      runValidators: true,
      new: true,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(inValidTaskInput(error));
  }
});

app.listen(port, () => console.log("Server is up on port: " + port));
