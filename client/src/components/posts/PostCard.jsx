import Carousel from "react-material-ui-carousel";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DropdownMenu from "../utilities/DropdownMenu";
import { memo, useState } from "react";
import ConfirmationModal from "../utilities/ConfirmationModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommentCard from "../comments/CommentCard";

const PostCard = ({
  post,
  fetchPost,
  height,
  isOwner,
  displayAvatar,
  displayCaption,
  displayComments,
}) => {
  const { user, refreshUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem("user-token");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Post deleted");
      refreshUser();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`,
        {
          caption: editedCaption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Post updated");
      fetchPost();
    } catch (err) {
      console.error(err);
    }

    endEditMode();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startEditMode = () => {
    setEditMode(true);
  };

  const endEditMode = () => {
    setEditMode(false);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts/like`,
        {
          userId: user._id,
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts/unlike`,
        {
          userId: user._id,
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        entityTitle={"Post"}
      />
      {displayAvatar && post && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${post.user.username}`);
              }}
              src={post.user.profilePicture}
              alt={post.user.username}
            />
            <Typography
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${post.user.username}`);
              }}
            >
              {post.user.username}
            </Typography>
          </Box>
          {isOwner && (
            <DropdownMenu onDelete={handleOpen} onEdit={startEditMode} />
          )}
        </Box>
      )}

      <Carousel autoPlay={false} sx={{ mt: 3, mb: 3, overflow: "visible" }}>
        {post.images?.map((image, index) => (
          <Card key={index}>
            <CardMedia
              component="img"
              height={height}
              image={image}
              alt={`Image ${index}`}
            />
          </Card>
        ))}
      </Carousel>
      <Box display="flex" alignItems="center" m={0}>
        {post.likedBy.includes(user._id) ? (
          <IconButton onClick={handleUnlike}>
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleLike}>
            <FavoriteBorderIcon sx={{ color: "black" }} />
          </IconButton>
        )}
        <Typography variant="subtitle2" mr={2}>
          {post.likedBy.length === 0
            ? "No likes"
            : post.likedBy.length === 1
            ? `${post.likedBy.length} like`
            : `${post.likedBy.length} likes`}
        </Typography>
        <ChatBubbleOutlineIcon color="red" />
        <Typography variant="subtitle2" ml={1}>
          {post.comments.length === 0
            ? "No comments"
            : `${post.comments.length} comments`}
        </Typography>
      </Box>
      {displayCaption &&
        post &&
        (editMode ? (
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                textTransform: "none",
              }}
            >
              <Button onClick={endEditMode}> Cancel </Button>
              <Button onClick={handleEditPost}> Save </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="subtitle1">
              <b>{post.user.username}</b> {post.caption}
            </Typography>
          </Box>
        ))}

      <Box sx={{ mt: 2 }}>
        {displayComments &&
          (post.comments.length > 0 ? (
            <Box>
              <Divider orientation="horizontal" />
              {post &&
                post.comments.map((comment) => (
                  <CommentCard
                    comment={comment}
                    key={comment._id}
                    fetchPost={fetchPost}
                  />
                ))}
            </Box>
          ) : (
            <Typography variant="subtitle1" align="center">
              No comments
            </Typography>
          ))}
      </Box>
    </Paper>
  );
};

export default memo(PostCard);
