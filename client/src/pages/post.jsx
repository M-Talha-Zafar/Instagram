import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import PostCard from "../components/posts/PostCard";
import { postService } from "../services/postService";

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [post, setPost] = useState(null);
  const { getPostById, loadingPost } = postService();

  const isOwner = user && post && user._id === post.user._id;

  const fetchPost = useCallback(async () => {
    try {
      const post = await getPostById(id);
      setPost(post);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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
        {loadingPost ? (
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
        )}
      </Box>
    </Box>
  );
};

export default Post;
