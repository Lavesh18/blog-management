import axios from "axios";
import { Blog } from "../types/Blog";

const API_BASE = "http://localhost:4000/api/blogs";

export const getPosts = (
  page = 1,
  pageSize = 10,
  filters?: { author?: string; date?: string; title?: string }
) => {
  const body = filters && Object.keys(filters).length > 0 ? filters : undefined;
  return axios.post(
    `${API_BASE}/search?page=${page}&pageSize=${pageSize}`,
    body
  );
};
export const getPost = (id: string) => axios.get<Blog>(`${API_BASE}/${id}`);
export const createPost = (data: Partial<Blog>) => axios.post(API_BASE, data);
export const updatePost = (id: string, data: Partial<Blog>) =>
  axios.put(`${API_BASE}/${id}`, data);
export const deletePost = (id: string) => axios.delete(`${API_BASE}/${id}`);
