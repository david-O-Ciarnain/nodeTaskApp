import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;


export const taskSchem = new Schema({
    description: {
      type: String,
      match:/\w/gi,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  })