import { FilterQuery } from "mongoose";
import { IBlog, IBlogFilters } from "../types/types";
import { blogFilterSchema } from "../validation/validation";
import { Request, Response } from "express";
import Blog from "../models/Blog";

// blog filter builder
export const buildBlogFilters = (filters: IBlogFilters) => {
  const query: FilterQuery<IBlog> = {};

  const handlers: Record<
    keyof IBlogFilters,
    (value: string) => FilterQuery<IBlog>
  > = {
    author: (v) => ({ author: v }),
    title: (v) => ({ title: { $regex: v, $options: "i" } }),
    date: (v) => {
      const start = new Date(v);
      const end = new Date(v);
      end.setHours(23, 59, 59, 999);
      return { createdAt: { $gte: start, $lte: end } };
    },
  };

  (Object.keys(handlers) as (keyof IBlogFilters)[]).forEach((key) => {
    const value = filters[key];
    if (value) Object.assign(query, handlers[key](value));
  });

  return query;
};

// Get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const filters: IBlogFilters =
    req.body && Object.keys(req.body).length
      ? blogFilterSchema.parse(req.body)
      : {};

  const query = buildBlogFilters(filters);
  const blogs = await Blog.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  res.json(blogs);
};
