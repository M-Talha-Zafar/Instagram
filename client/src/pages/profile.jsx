import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Container>
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
                  <Button
                    variant="filled"
                    onClick={() => navigate("/user/edit")}
                    sx={{ ml: 2, background: "#F0F0F0", textTransform: "none" }}
                  >
                    Edit profile
                  </Button>
                </Box>
                <Typography variant="subtitle1">@{user.username}</Typography>
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
                  <Typography variant="subtitle1">{0}</Typography>
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
      {/* <Box mt={3}>
        <Grid container spacing={2}>
          {userProfile.posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <img src={post} alt={`Post ${index}`} style={{ width: "100%" }} />
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  );
};

export default Profile;
