import express from "express";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export default app;