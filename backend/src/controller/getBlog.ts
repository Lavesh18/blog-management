import { Request, Response } from "express";
import Blog from "../models/Blog";

// Get blog by ID
export const getBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
