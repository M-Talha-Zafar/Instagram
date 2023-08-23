import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const { user: curerntUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isOwner = user && curerntUser.username === username;

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/by-username/${username}`
      );
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
    <Container>
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
      ) : user ? (
        <>
          <Box mt={4}>
            <Paper elevation={3}>
              <Grid
                container
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Grid item sm={12} md={4} display="flex">
                  <Avatar
                    alt="User Avatar"
                    src={user.profilePicture}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box ml={2}>
                    <Box display="flex">
                      <Typography variant="h6">{user.fullname}</Typography>
                      {isOwner && (
                        <Button
                          variant="filled"
                          onClick={() => navigate("/user/edit")}
                          sx={{
                            ml: 2,
                            background: "#F0F0F0",
                            textTransform: "none",
                          }}
                        >
                          Edit profile
                        </Button>
                      )}
                    </Box>
                    <Typography variant="subtitle1">
                      @{user.username}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={6}
                  p={2}
                  borderBottom="1px solid #EAEAEA"
                  textAlign="center"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        {user.posts.length}
                      </Typography>
                      <Typography variant="subtitle2">Posts</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        {user.followers.length}
                      </Typography>
                      <Typography variant="subtitle2">Followers</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        {user.following.length}
                      </Typography>
                      <Typography variant="subtitle2">Following</Typography>
                    </Grid>
                  </Grid>
                  <Box p={2}>
                    <Typography variant="body1">{user.bio}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              {user.posts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    <PostCard post={post} key={index} height={300} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
          <Typography mb={2} variant="h3">
            Sorry, this page isn't available
          </Typography>
          <Typography variant="subtitle1">
            The link you followed may be broken, or the page may have been
            removed. <br />
            <Link to="/">Go back to Instagram.</Link>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
