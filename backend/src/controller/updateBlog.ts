import { Request, Response } from "express";
import { updateBlogSchema } from "../validation/validation";
import Blog from "../models/Blog";

// Update blog by ID
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const data = updateBlogSchema.parse(req.body);

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json(updatedBlog);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
