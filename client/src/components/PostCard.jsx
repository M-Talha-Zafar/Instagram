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
} from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommentCard from "./CommentCard";

const PostCard = ({
  post,
  fetchPost,
  height,
  isOwner,
  displayAvatar,
  displayCaption,
  displayComments,
}) => {
  const { refreshUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`
      );
      showSnackbar("Post deleted");
      refreshUser();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    console.log("Edited caption: ", editedCaption);

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`, {
        caption: editedCaption,
      });
      showSnackbar("Post updated");
      fetchPost();
    } catch (err) {}

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
              onClick={() => {
                console.log("Redirect to user");
              }}
              src={post.user.profilePicture}
              alt={post.user.username}
            />
            <Typography
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => {
                console.log("Redirect to user");
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
        {post.images.map((image, index) => (
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

export default PostCard;
