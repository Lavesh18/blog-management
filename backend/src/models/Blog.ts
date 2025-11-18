import mongoose, { Schema } from "mongoose";
import { IBlog } from "../types/types";

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
