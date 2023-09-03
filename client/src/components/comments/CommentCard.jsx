import { memo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import DropdownMenu from "../utilities/DropdownMenu";
import { useUserContext } from "../../contexts/UserContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import ConfirmationModal from "../utilities/ConfirmationModal";

const CommentCard = ({
  comment,
  deleteComment,
  updateComment,
  deletingComment,
  updatingComment,
}) => {
  const { showSnackbar } = useSnackbar();
  const { user } = useUserContext();

  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.text);
  const [open, setOpen] = useState(false);

  const isOwner = user && comment && user._id === comment.user._id;

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id);
      handleClose();
      showSnackbar("Comment deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async () => {
    try {
      await updateComment(comment._id, editedBody);
      showSnackbar("Comment updated");
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
        deleting={deletingComment}
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
            {updatingComment ? (
              <CircularProgress />
            ) : (
              <Button onClick={handleEditComment}> Save </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginLeft: "1rem" }}>
          <Typography variant="subtitle1">
            <b>{comment.user.username}</b>
          </Typography>
          <Typography>{editedBody}</Typography>
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

export default memo(CommentCard);
