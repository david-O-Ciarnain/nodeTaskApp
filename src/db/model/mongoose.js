import mongoose from "mongoose";
import { userSchem } from "../schemas/userSchema.js";
import { taskSchem } from "../schemas/taskschema.js";

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

mongoose.set("strictQuery", true);

export const Users = mongoose.model("users", userSchem);

export const Tasks = mongoose.model("tasks", taskSchem);
