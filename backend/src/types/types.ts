import { Document } from "mongoose";

export interface IBlogFilters {
  author?: string | undefined;
  date?: string | undefined;
  title?: string | undefined;
}

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
