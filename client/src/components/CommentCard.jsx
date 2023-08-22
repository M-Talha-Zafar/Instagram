import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const CommentCard = ({ comment, fetchPost }) => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { user } = useUserContext();
  const isOwner = user && comment && user._id === comment.user._id;

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${comment._id}`
      );
      handleClose();
      showSnackbar("Commnt deleted");
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startEditMode = () => {
    console.log("Open");
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
      <Box sx={{ marginLeft: "1rem" }}>
        <Typography variant="subtitle1">
          <b>{comment.user.username}</b>
        </Typography>
        <Typography>{comment.text}</Typography>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        {isOwner && (
          <DropdownMenu onDelete={handleOpen} onEdit={startEditMode} />
        )}
      </Box>
    </Box>
  );
};

export default CommentCard;
