import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, deletePost } from "../server/api";
import { Blog } from "../types/Blog";
import { Typography, Button, Stack, Box } from "@mui/material";
import DeleteDialog from "../components/DeleteDialog";

const BlogView = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Blog | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPost(id)
        .then((res) => setPost(res.data))
        .catch(() => alert("Failed to fetch post."));
    }
  }, [id]);

  const handleDeleteConfirm = () => {
    if (!id) return;
    deletePost(id)
      .then(() => navigate("/"))
      .catch(() => alert("Failed to delete post."))
      .finally(() => setDeleteDialogOpen(false));
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box maxWidth={600} margin="auto" padding={4}>
      <Stack spacing={2}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="subtitle1">By {post.author}</Typography>
        <Typography variant="body1">{post.content}</Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/edit/${post._id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <DeleteDialog
        open={deleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
      />
    </Box>
  );
};

export default BlogView;
