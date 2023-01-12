import express from "express";
import { Tasks, Users } from "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new Users(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => res.status(400).send(error.errors.password.message));
});

app.get("/users", (req, res) => {
  Users.find({})
    .then((data) => res.send(data))
    .catch((error) => res.status(500).send("Server error"));
});

app.post("/tasks", (req, res) => {
  const task = new Tasks(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((error) => res.status(400).send(error.errors.description.message));
});

app.get("/tasks",(req,res) => {
    Tasks.find({})
    .then((data) => res.send(data))
    .catch(error => res.satus(500).send("Server error"))
})

app.listen(port, () => console.log("Server is up on port: " + port));
