import express from "express";
import { Tasks, Users } from "./db/mongoose.js";

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
    if (error["errors"].hasOwnProperty("password"))
      return res.status(400).send(error["errors"]["password"].message);
    else if (error["errors"].hasOwnProperty("name"))
      return res.status(400).send(error["errors"]["name"].message);
    else if (error["errors"].hasOwnProperty("email"))
      return res.status(400).send(error["errors"]["email"].message);
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
    if (error["errors"].hasOwnProperty("password"))
      return res.status(400).send(error["errors"]["password"].message);
    else if (error["errors"].hasOwnProperty("name"))
      return res.status(400).send(error["errors"]["name"].message);
    else if (error["errors"].hasOwnProperty("email"))
      return res.status(400).send(error["errors"]["email"].message);

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
    res.status(400).send(error["errors"]["description"].message);
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

app.listen(port, () => console.log("Server is up on port: " + port));
