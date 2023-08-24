import { Box, Modal, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageCarousel from "../utilities/ImageCarousel";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/stories/user/${user._id}`
        );

        setImages(response.data.map((story) => story.image));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user._id) fetchStories();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
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
