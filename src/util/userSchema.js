import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

export const userSchem = Schema({
  name: {
    type: String,
    validate(value) {
      if (!validator.isAlpha(value))
        throw new Error("Name can only be letters");
    },
    default: "user",
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
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("Age must be a postive number");
    },
    default: 15,
  },
});

///((?!password).)*$[a-z0-9]{6,}/
