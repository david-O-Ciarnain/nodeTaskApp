import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

export const taskSchem = new Schema({
  description: {
    type: String,
    trim: true,
    minlength:3,
    required: true,
    
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
