import {
  Box,
  Modal,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageCarousel from "../utilities/ImageCarousel";
import { useUserContext } from "../../contexts/UserContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import DropdownMenu from "../utilities/DropdownMenu";
import ConfirmationModal from "../utilities/ConfirmationModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "black",
  borderRadius: "1rem",
};

const ViewStoryModal = ({ open, onClose, user }) => {
  const [images, setImages] = useState([]);
  const [stories, setStories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { showSnackbar } = useSnackbar();
  const { user: currentUser } = useUserContext();
  const isOwner = user && currentUser && user._id === currentUser._id;

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("user-token");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/stories/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStories(response.data);
        setImages(response.data.map((story) => story.image));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user._id) fetchStories();
  }, [open]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("user-token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${
          stories[currentIndex]._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar(response.data);
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
        />
        <Box>
          {isLoading ? (
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

export default ViewStoryModal;
