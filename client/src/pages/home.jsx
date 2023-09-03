import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PostCard from "../components/posts/PostCard";
import { useUserContext } from "../contexts/UserContext";
import StoriesBar from "../components/stories/StoriesBar";
import { postService } from "../services/postService";

const Home = () => {
  const { user } = useUserContext();
  const { fetchFeed, loadingFeed } = postService();

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const feed = await fetchFeed();
      setPosts(feed);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      {loadingFeed ? (
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
                    setPosts={setPosts}
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
