import { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import DropdownMenu from "../utilities/DropdownMenu";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useSnackbar } from "../../contexts/SnackbarContext";
import ConfirmationModal from "../utilities/ConfirmationModal";

const CommentCard = ({ comment, fetchPost }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.text);
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { user } = useUserContext();
  const isOwner = user && comment && user._id === comment.user._id;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("user-token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      showSnackbar("Commnt deleted");
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async () => {
    try {
      const token = localStorage.getItem("user-token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment._id}`,
        {
          text: editedBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Comment updated");
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "1rem 0",
      }}
    >
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        entityTitle={"Comment"}
      />
      <Avatar src={comment.user.profilePicture} alt={comment.user.username} />
      {editMode ? (
        <Box sx={{ width: "100%" }} ml={2} mt={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              textTransform: "none",
            }}
          >
            <Button onClick={endEditMode}> Cancel </Button>
            <Button onClick={handleEditComment}> Save </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginLeft: "1rem" }}>
          <Typography variant="subtitle1">
            <b>{comment.user.username}</b>
          </Typography>
          <Typography>{comment.text}</Typography>
        </Box>
      )}
      <Box sx={{ marginLeft: "auto" }}>
        {isOwner && (
          <DropdownMenu onDelete={handleOpen} onEdit={startEditMode} />
        )}
      </Box>
    </Box>
  );
};

export default CommentCard;
