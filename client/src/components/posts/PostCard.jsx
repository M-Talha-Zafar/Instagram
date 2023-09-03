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
  CircularProgress,
} from "@mui/material";
import DropdownMenu from "../utilities/DropdownMenu";
import { memo, useState } from "react";
import ConfirmationModal from "../utilities/ConfirmationModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CommentCard from "../comments/CommentCard";
import { postService } from "../../services/postService";
import { commentService } from "../../services/commentService";

const PostCard = ({
  post,
  height,
  isOwner,
  displayAvatar,
  displayCaption,
  displayComments,
}) => {
  const {
    deletePost,
    deletingPost,
    likePost,
    unlikePost,
    updatePost,
    updatingPost,
  } = postService();

  const {
    deleteComment,
    deletingComment,
    updateComment,
    updatingComment,
    createComment,
    creatingComment,
  } = commentService();

  const { showSnackbar } = useSnackbar();
  const { user, refreshUser } = useUserContext();

  const [editedPost, setEditedPost] = useState(post);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState(editedPost.caption);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(editedPost.likedBy.includes(user._id));
  const [likeCount, setLikeCount] = useState(editedPost.likedBy.length);

  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      await deletePost(editedPost._id);
      showSnackbar("Post deleted");
      refreshUser();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (e) => {
    setLiked(true);
    setLikeCount((likes) => likes + 1);
    e.stopPropagation();
    try {
      await likePost(user._id, editedPost._id);
      setEditedPost({
        ...editedPost,
        likedBy: [...editedPost.likedBy, user._id],
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (e) => {
    setLiked(false);
    setLikeCount((likes) => likes - 1);
    e.stopPropagation();
    try {
      await unlikePost(user._id, editedPost._id);

      const updatedLikedBy = editedPost.likedBy.filter(
        (userId) => userId !== user._id
      );

      setEditedPost({ ...editedPost, likedBy: updatedLikedBy });
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      await updatePost(editedPost._id, editedCaption);
      setEditedPost({ ...editedPost, caption: editedCaption });
      showSnackbar("Post updated");
    } catch (error) {
      console.error("Error editing post:", error);
    }

    endEditMode();
  };

  const handleDeleteComment = async (id) => {
    try {
      const deletedComment = await deleteComment(id);
      handleClose();
      showSnackbar("Comment deleted");

      const updatedComments = editedPost.comments.filter(
        (comment) => comment._id !== deletedComment._id
      );

      const updatedPost = { ...editedPost, comments: updatedComments };

      setEditedPost(updatedPost);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (id, body) => {
    try {
      const updatedComment = await updateComment(id, body);
      showSnackbar("Comment updated");

      const updatedComments = editedPost.comments.map((c) =>
        c._id === updatedComment._id ? { ...updatedComment, user: c.user } : c
      );

      const updatedPost = { ...editedPost, comments: updatedComments };

      setEditedPost(updatedPost);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComment = async () => {
    if (commentText.trim() === "") {
      return;
    }

    try {
      const comment = await createComment(post._id, {
        text: commentText,
        userId: user._id,
      });

      comment.user = {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      };

      setEditedPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, comment],
      }));

      showSnackbar("Comment added");
      setCommentText("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
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

  const renderCaption = () => {
    return (
      <Box>
        {displayCaption &&
          editedPost &&
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
                {updatingPost ? (
                  <CircularProgress />
                ) : (
                  <Button onClick={handleEditPost}> Save </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Box sx={{ marginTop: "1rem" }}>
              <Typography variant="subtitle1">
                <b>{editedPost.user.username}</b> {editedPost.caption}
              </Typography>
            </Box>
          ))}
      </Box>
    );
  };

  const renderLikesAndComments = () => {
    return (
      <Box display="flex" alignItems="center" m={0}>
        {liked ? (
          <IconButton onClick={handleUnlike}>
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleLike}>
            <FavoriteBorderIcon sx={{ color: "black" }} />
          </IconButton>
        )}
        <Typography variant="subtitle2" mr={2}>
          {likeCount === 0
            ? "No likes"
            : likeCount === 1
            ? `${likeCount} like`
            : `${likeCount} likes`}
        </Typography>
        <ChatBubbleOutlineIcon color="red" />
        <Typography variant="subtitle2" ml={1}>
          {editedPost.comments.length === 0
            ? "No comments"
            : `${editedPost.comments.length} comments`}
        </Typography>
      </Box>
    );
  };

  const renderPostBar = () => {
    return (
      <Box>
        {displayAvatar && editedPost && (
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
                  navigate(`/${editedPost.user.username}`);
                }}
                src={editedPost.user.profilePicture}
                alt={editedPost.user.username}
              />
              <Typography
                sx={{ marginLeft: "1rem", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${editedPost.user.username}`);
                }}
              >
                {editedPost.user.username}
              </Typography>
            </Box>
            {isOwner && (
              <DropdownMenu onDelete={handleOpen} onEdit={startEditMode} />
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }} elevation={3}>
        <ConfirmationModal
          open={open}
          handleClose={handleClose}
          handleDelete={handleDeletePost}
          entityTitle={"Post"}
          deleting={deletingPost}
        />
        {renderPostBar()}
        <Carousel autoPlay={false} sx={{ mt: 3, mb: 3, overflow: "visible" }}>
          {editedPost.images?.map((image, index) => (
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
        {renderLikesAndComments()}
        {renderCaption()}
        <Box sx={{ mt: 2 }}>
          {displayComments && (
            <Box>
              {editedPost.comments.length > 0 ? (
                <Box>
                  <Divider orientation="horizontal" />
                  {editedPost &&
                    editedPost.comments.map((comment) => (
                      <CommentCard
                        comment={comment}
                        deleteComment={handleDeleteComment}
                        updateComment={handleUpdateComment}
                        deletingComment={deletingComment}
                        updatingComment={updatingComment}
                        key={comment._id}
                      />
                    ))}
                </Box>
              ) : (
                <Typography variant="subtitle1" align="center">
                  No comments
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Paper>
      {displayComments && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <TextField
            label="Add a comment..."
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          {creatingComment ? (
            <CircularProgress />
          ) : (
            <IconButton
              color="primary"
              aria-label="send-comment"
              onClick={handleCreateComment}
            >
              <SendIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(PostCard);
