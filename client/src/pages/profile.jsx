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
import PostCard from "../components/posts/PostCard";
import UsersModal from "../components/users/UsersModal";
import LockIcon from "@mui/icons-material/Lock";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { userService } from "../services/userService";
import { ROUTE_EDIT_PROFILE } from "../utilities/routeNames";

const Profile = () => {
  const { username } = useParams();
  const { showSnackbar } = useSnackbar();
  const { user: currentUser } = useUserContext();

  const [user, setUser] = useState(null);
  const [context, setContext] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {
    getUserByUsername,
    loadingUser,
    sendFollowRequest,
    sendingRequest,
    addFollower,
    addingFollower,
    unfollowUser,
    unfollowingUser,
    cancelRequest,
    cancellingRequest,
  } = userService();

  const isOwner = user && currentUser.username === username;
  const accessible = user && user.followers.includes(currentUser._id);
  const requested = user && user.requests.includes(currentUser._id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUser = async () => {
    try {
      const user = await getUserByUsername(username);
      setUser(user);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleSendFollowRequest = async () => {
    try {
      const token = localStorage.getItem("user-token");
      let updatedUser;
      if (user.isPrivate) {
        updatedUser = await sendFollowRequest({
          senderId: currentUser._id,
          recipientId: user._id,
        });
        showSnackbar("Follow request sent");
      } else {
        updatedUser = await addFollower({
          senderId: currentUser._id,
          recipientId: user._id,
        });
        showSnackbar("Account followed");
      }
      setUser(updatedUser);
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const updatedUser = await unfollowUser({
        userId: currentUser._id,
        unfollowId: user._id,
      });
      showSnackbar("Account unfollowed");
      setUser(updatedUser);
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const updatedUser = await cancelRequest({
        userId: currentUser._id,
        unfollowId: user._id,
      });

      showSnackbar("Follow request deleted");
      setUser(updatedUser);
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  const handleShowFollowers = () => {
    if (!isOwner && !accessible && user.isPrivate) return;
    setContext("followers");
    handleOpen();
  };

  const handleShowFollowing = () => {
    if (!isOwner && !accessible && user.isPrivate) return;
    setContext("following");
    handleOpen();
  };

  const fetch = useCallback(fetchUser, [username]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const renderButton = () => {
    return (
      <Box>
        {isOwner ? (
          <Button
            variant="filled"
            onClick={() => navigate(ROUTE_EDIT_PROFILE)}
            sx={{
              ml: 2,
              background: "#F0F0F0",
              textTransform: "none",
            }}
          >
            Edit profile
          </Button>
        ) : accessible ? (
          <Button
            variant="filled"
            onClick={handleUnfollow}
            sx={{
              ml: 2,
              textTransform: "none",
            }}
          >
            Following
          </Button>
        ) : requested ? (
          <Button
            variant="filled"
            onClick={handleDeleteRequest}
            sx={{
              ml: 2,
              textTransform: "none",
            }}
          >
            Requested
          </Button>
        ) : (
          <Button
            variant="filled"
            onClick={handleSendFollowRequest}
            sx={{
              ml: 2,
              textTransform: "none",
            }}
          >
            Follow
          </Button>
        )}
      </Box>
    );
  };

  const renderPosts = () => {
    return (
      <Box>
        {!isOwner && user.isPrivate && !accessible ? (
          <Box sx={{ width: "100%", textAlign: "center", mt: 10 }}>
            <LockIcon sx={{ height: "5rem", width: "5rem" }} />
            <Typography mb={2} variant="h3">
              This account is private
            </Typography>
            <Typography variant="subtitle1">
              Follow them to see their posts
            </Typography>
          </Box>
        ) : (
          <Box mt={3}>
            <Grid container spacing={2}>
              {user.posts?.map((post, index) => (
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
        )}
      </Box>
    );
  };

  return (
    <Container>
      {loadingUser ? (
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
          <UsersModal
            open={open}
            onClose={handleClose}
            context={context}
            user={user}
          />
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
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6">{user.fullname}</Typography>
                      {renderButton()}
                      {(addingFollower ||
                        sendingRequest ||
                        unfollowingUser ||
                        cancellingRequest) && <CircularProgress size={20} />}
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
                    <Grid
                      item
                      xs={4}
                      sx={{ cursor: "pointer" }}
                      onClick={handleShowFollowers}
                    >
                      <Typography variant="subtitle1">
                        {user.followers.length}
                      </Typography>
                      <Typography variant="subtitle2">Followers</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{ cursor: "pointer" }}
                      onClick={handleShowFollowing}
                    >
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
          {renderPosts()}
        </>
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
          <Typography mb={2} variant="h3">
            Sorry, this page isn&apos;t available
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
