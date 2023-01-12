import express from "express";
import { Tasks, Users } from "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.post("/users", (req, res) => {
  const user = new Users(req.body)

  user.save()
  .then(() => res.status(201).send(user))
  .catch(error => res.status(400).send(error.errors.password.message))
});

app.post("/tasks",(req,res) => {
    const task = new Tasks(req.body)

    task.save()
    .then(() => res.status(201).send(task))
    .catch(error => res.status(400).send(error.errors.description.message))
})

app.listen(port, () => console.log("Server is up on port: " + port));
