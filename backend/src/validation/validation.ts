import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
});

export const blogFilterSchema = z.object({
  author: z.string().optional(),
  date: z.string().optional(),
  title: z.string().optional(),
});
