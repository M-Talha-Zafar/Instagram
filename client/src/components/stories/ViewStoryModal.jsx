import {
  Box,
  Modal,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import ImageCarousel from "../utilities/ImageCarousel";
import { useUserContext } from "../../contexts/UserContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import DropdownMenu from "../utilities/DropdownMenu";
import ConfirmationModal from "../utilities/ConfirmationModal";
import { useApiCall } from "../../hooks/useApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "black",
  borderRadius: "1rem",
};

const ViewStoryModal = ({ open, onClose, user, update }) => {
  const [images, setImages] = useState([]);
  const [stories, setStories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { showSnackbar } = useSnackbar();
  const { user: currentUser } = useUserContext();
  const { getStories, loadingStories, deleteStory, deletingStory } =
    useApiCall();
  const isOwner = user && currentUser && user._id === currentUser._id;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const stories = await getStories(user._id);
        setStories(stories);
        setImages(stories.map((story) => story.image));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user._id) {
      setImages([]);
      fetchStories();
    }
  }, [open]);

  const handleDelete = async () => {
    try {
      await deleteStory(stories[currentIndex]._id);
      update();
      showSnackbar("Story deleted successfully");
      setCurrentIndex(0);
      handleClose();
      onClose();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" alignItems="center" sx={{ mt: 2, ml: 2 }}>
          <Avatar src={user.profilePicture} />
          <Typography sx={{ color: "white" }} ml={2} variant="subtitle1">
            {user.username}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            {isOwner && (
              <DropdownMenu sx={{ color: "white" }} onDelete={handleOpen} />
            )}
          </Box>
        </Box>
        <ConfirmationModal
          open={openModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
          entityTitle={"Story"}
          deleting={deletingStory}
        />
        <Box>
          {loadingStories ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <ImageCarousel
              images={images}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ViewStoryModal);
