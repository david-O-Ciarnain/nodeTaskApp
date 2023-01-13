import express from "express";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log("Server is up on port: " + port));

import bcrypt from "bcryptjs";

async function myFunc() {
  const password = "123456";
  const hashPasword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashPasword);

  const isMatch = await bcrypt.compare(password, hashPasword);

  console.log(isMatch);
}
myFunc();
