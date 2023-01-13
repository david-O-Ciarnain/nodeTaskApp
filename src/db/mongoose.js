import mongoose from "mongoose";
import { userSchem } from "./schemas/userSchema.js";
import { taskSchem } from "./schemas/taskschema.js";

mongoose.connect("mongodb://127.0.0.1:27017/task-manger-api", {
  useNewUrlParser: true,
});

mongoose.set("strictQuery", true);

userSchem.pre("save", async function (next) {
  const user = this;
});

export const Users = mongoose.model("users", userSchem);

export const Tasks = mongoose.model("tasks", taskSchem);
