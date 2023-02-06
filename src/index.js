import express from "express";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log("Server is up on port: " + port));
