import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, IconButton, Box, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useUserContext } from "../contexts/UserContext";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const handleSendComment = async () => {
    if (commentText.trim() === "") {
      return;
    }

    console.log("Sending:", post._id, commentText, user._id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${post._id}`,
        { text: commentText, userId: user._id }
      );

      fetchPost();
      showSnackbar("Comment added");
      setCommentText("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`
      );
      setPost(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

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
              key={post?._id}
              height={500}
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
