import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { storyService } from "../../services/storyService";
import { useState, memo } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "60vh",
  width: 700,
  backgroundColor: "black",
  color: "white",
  borderRadius: "1rem",
  p: 4,
};

const CreateStoryModal = ({ open, onClose, user, update }) => {
  const [image, setImage] = useState(null);
  const { createStory, creatingStory } = storyService();
  const { showSnackbar } = useSnackbar();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      showSnackbar("Please select a valid image", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    const storyData = {
      userId: user._id,
      image,
    };

    try {
      await createStory(storyData);
      update();
      showSnackbar("Story added successfully");
      onClose();
    } catch (ex) {
      console.error("Error adding story:", ex);
      showSnackbar("Error adding story: " + ex.response.data.message, "error");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography variant="h4" align="center">
            Add to your story
          </Typography>
          {!image ? (
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              minHeight="20vh"
              mt={4}
            >
              <IconButton
                variant="contained"
                component="label"
                sx={{ textTransform: "none" }}
              >
                <ImageIcon
                  sx={{ color: "white", height: "5rem", width: "5rem" }}
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </IconButton>
              <Typography sx={{ color: "grey" }}>
                Click to add an image
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
              height="80%"
            >
              <img
                style={{ height: "100%", width: "100%", marginTop: "1rem" }}
                src={image}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "-40px",
                  right: "-25px",
                }}
              >
                <IconButton
                  sx={{ background: "#2A2A2A" }}
                  onClick={removeImage}
                >
                  <CloseIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Box>
              {creatingStory ? (
                <CircularProgress />
              ) : (
                <Box ml="auto">
                  <IconButton
                    color="primary"
                    aria-label="send-comment"
                    onClick={handleSubmit}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(CreateStoryModal);
