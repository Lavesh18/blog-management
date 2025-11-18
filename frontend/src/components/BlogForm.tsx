import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPost, getPost, updatePost } from "../server/api";
import { Blog } from "../types/Blog";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Alert,
} from "@mui/material";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Blog>>({
    title: "",
    content: "",
    author: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    author?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPost(id)
        .then((res) => setForm(res.data))
        .catch(() => setSubmitError("Failed to load post data"));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.title?.trim()) newErrors.title = "Title is required";
    if (!form.author?.trim()) newErrors.author = "Author is required";
    if (!form.content?.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (id) await updatePost(id, form);
      else await createPost(form);
      navigate("/");
    } catch {
      setSubmitError("Failed to save the post");
    }
  };

  return (
    <Box
      maxWidth={600}
      margin="auto"
      padding={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        {id ? "Edit Post" : "Create New Post"}
      </Typography>

      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Stack spacing={2} width="100%" mt={2}>
        <TextField
          label="Title"
          required
          name="title"
          value={form.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Author"
          required
          name="author"
          value={form.author}
          onChange={handleChange}
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          label="Content"
          required
          name="content"
          value={form.content}
          onChange={handleChange}
          multiline
          rows={6}
          error={!!errors.content}
          helperText={errors.content}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {id ? "Update" : "Create"}
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogForm;
