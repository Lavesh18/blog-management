import { Request, Response } from "express";
import Blog from "../models/Blog";
// Delete blog by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
