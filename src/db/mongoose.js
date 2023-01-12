import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
import dotenv from "dotenv";

const envConfig = dotenv.config();
const env = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/task-manger-api", {
  useNewUrlParser: true,
});

mongoose.set("strictQuery", true);

const Users = mongoose.model("users", {
  name: {
    type: String,
    validate(value) {
      if (!validator.isAlpha(value))
        throw new Error("Name can only be letters");
    },
    default: "user",
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email");
    },
    required:true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("Age must be a postive number");
    },
    min: 18,
  },
});

const Tasks = mongoose.model("tasks", {
  description: {
    type: String,
    validate(value) {
      if (!validator.isAlphanumeric(value))
        throw new Error(
          "Description can only be Alphanumeric no special characters"
        );
    },
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

const task = new Tasks({
  description: "Completed this section today[//#¤",
  completed: false,
});

task
  .save()
  .then(() => console.log(task))
  .catch((error) => console.log(error));

/*const user = new User({
  name: "Sven",
  age: "error",
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
