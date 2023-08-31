import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, IconButton, Box, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useUserContext } from "../contexts/UserContext";
import PostCard from "../components/posts/PostCard";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const isOwner = user && post && user._id === post.user._id;

  const handleSendComment = async () => {
    if (commentText.trim() === "") {
      return;
    }

    const token = localStorage.getItem("user-token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${post._id}`,
        { text: commentText, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPost();
      showSnackbar("Comment added");
      setCommentText("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const fetchPost = async () => {
    const token = localStorage.getItem("user-token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  const fetchPosts = useCallback(fetchPost, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Box
      sx={{
        height: "100%",
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <PostCard
              post={post}
              fetchPost={fetchPost}
              key={post?._id}
              height={500}
              isOwner={isOwner}
              displayComments
              displayAvatar
              displayCaption
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <TextField
                label="Add a comment..."
                variant="outlined"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <IconButton
                color="primary"
                aria-label="send-comment"
                onClick={handleSendComment}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Post;
