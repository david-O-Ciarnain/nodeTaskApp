import mongoose from "mongoose";
import { userSchem } from "./util/userSchema.js";
import { taskSchem } from "./util/taskschema.js";


mongoose.connect("mongodb://127.0.0.1:27017/task-manger-api", {
  useNewUrlParser: true,
});

mongoose.set("strictQuery", true);

const Users = mongoose.model("users",userSchem );

const Tasks = mongoose.model("tasks", taskSchem);

const task = new Tasks({
  description: "Completed this section@ today",
  
});

task
  .save()
  .then(() => console.log(task))
  .catch((error) => console.log(error));

/*const user = new Users({
  name: "Sven",
  age: 18,
  email:"david951@live.se",
  password:"1233446"
});

user
  .save()
  .then(() => {
    console.log(user);
  })
  .catch((error) => {
    console.log("Error" + error);
  });
*/
