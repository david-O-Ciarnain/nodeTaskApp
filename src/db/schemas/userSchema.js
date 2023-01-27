import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Tasks, Users } from "../model/mongoose.js";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

export const userSchem = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (validator.contains(value.toLowerCase(), "password"))
          throw new Error("Invalid password, can't be password");
      },
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) throw new Error("Age must be a postive number");
      },
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchem.virtual("task", {
  ref: "tasks",
  localField: "_id",
  foreignField: "author",
});

userSchem.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "thisneedtochange");

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchem.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchem.statics.finByCredentials = async function (email, password) {
  const user = await Users.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//Hash password
//midleWare
userSchem.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchem.pre("remove", async function (next) {
  const user = this;
  await Tasks.deleteMany({ author: user._id });
  next();
});
