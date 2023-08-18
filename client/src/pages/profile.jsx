import { Avatar, Box, Typography, Grid, Paper, Container } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

const Profile = () => {
  const { user } = useUserContext();

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
                <Typography variant="h6">{user.fullname}</Typography>
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
    </Container>
  );
};

export default Profile;
