import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../server/api";
import { Blog } from "../types/Blog";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

const BlogList = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "author">("title");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch posts
  const fetchPosts = () => {
    setLoading(true);
    setError(null);

    getPosts(1, 100, undefined)
      .then((res) => setPosts(res.data || []))
      .catch(() => setError("Failed to fetch blog posts."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "title"
        ? a.title.localeCompare(b.title)
        : a.author.localeCompare(b.author)
    );

  const handleDeleteClick = (id: string) => {
    setSelectedPostId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedPostId) return;

    deletePost(selectedPostId)
      .then(() => {
        setPosts((prev) => prev.filter((p) => p._id !== selectedPostId));
      })
      .finally(() => {
        setDeleteDialogOpen(false);
        setSelectedPostId(null);
      });
  };

  if (loading)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box maxWidth={600} mx="auto" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box maxWidth={600} mx="auto" p={4}>
      <Stack spacing={2}>
        <TextField
          label="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "title" | "author")}
          fullWidth
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </TextField>

        {filteredPosts.length === 0 ? (
          <Typography>No posts found.</Typography>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post._id}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">By {post.author}</Typography>

                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    View
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => navigate(`/edit/${post._id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(post._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
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

export default BlogList;
