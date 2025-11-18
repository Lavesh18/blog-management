import Blog from "../models/Blog";
import { createBlogSchema } from "../validation/validation";
import { Request, Response } from "express";

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const data = createBlogSchema.parse(req.body);
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
