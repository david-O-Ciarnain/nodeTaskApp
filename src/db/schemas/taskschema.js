import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const taskSchem = new Schema({
  description: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
},{
 timestamps:true 
});
