import express from "express";
import { Tasks, Users } from "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error["errors"].hasOwnProperty("password"))
      res.status(400).send(error["errors"]["password"].message);
    else if (error["errors"].hasOwnProperty("name"))
      res.status(400).send(error["errors"]["name"].message);
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

app.post("/tasks", async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error["errors"]["description"].message);
  }
  // task
  //   .save()
  //   .then(() => res.status(201).send(task))
  //   .catch((error) => res.status(400).send(error.errors.description.message));
});

app.get("/tasks", (req, res) => {
  Tasks.find({})
    .then((data) => res.send(data))
    .catch((error) => res.status(500).send());
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Tasks.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).res.send();
      }
      res.send(data);
    })
    .catch(() => res.status(500).send());
});

app.listen(port, () => console.log("Server is up on port: " + port));
