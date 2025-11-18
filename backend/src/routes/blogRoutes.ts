import { Router } from "express";
import { getBlogs } from "../controller/getAllBlogs";
import { createBlog } from "../controller/createController";
import { getBlog } from "../controller/getBlog";
import { updateBlog } from "../controller/updateBlog";
import { deleteBlog } from "../controller/deleteController";

const router = Router();

router.post("/api/blogs/search", getBlogs);
router.post("/api/blogs", createBlog);
router.get("/api/blogs/:id", getBlog);
router.put("/api/blogs/:id", updateBlog);
router.delete("/api/blogs/:id", deleteBlog);

export default router;
