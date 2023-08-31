import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/posts/PostCard";
import { useUserContext } from "../contexts/UserContext";
import StoriesBar from "../components/stories/StoriesBar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("user-token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts/by-user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  const fetch = useCallback(fetchPosts, []);

  useEffect(() => {
    fetch();
  }, []);

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
          <StoriesBar user={user} />
          <Box mt={4}>
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
                    fetchPost={fetchPosts}
                    key={index}
                    height={400}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
