import { Box, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts/`
        );
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  });

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ minWidth: "40vw", marginTop: "auto" }}>
          {posts.map((post, index) => (
            <Box key={index}>
              <Box
                sx={{ cursor: "pointer", mb: 5 }}
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <PostCard
                  displayAvatar
                  displayCaption
                  post={post}
                  key={index}
                  height={400}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
