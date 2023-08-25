import { Box, Typography, Modal, Button, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { upload } from "../../utilities/uploadImage";
import { useSnackbar } from "../../contexts/SnackbarContext";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: "40vh",
  width: 400,
  backgroundColor: "white",
  borderRadius: "1rem",
  p: 4,
};

const CreateStoryModal = ({ open, onClose, user }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState([]);
  const { showSnackbar } = useSnackbar();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile.type.startsWith("image/")) return;
    let url = URL.createObjectURL(selectedFile);

    setImageURL(url);
    setImage(selectedFile);
  };

  const handleSubmit = async () => {
    if (!image) {
      showSnackbar("Please select an image", "error");
      return;
    }

    const imageLink = await upload(image);

    const storyData = {
      userId: user._id,
      image: imageLink,
    };

    const token = localStorage.getItem("user-token");

    console.log("Sending...");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/stories`,
        storyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar("Story added successfully");
      onClose();
    } catch (ex) {
      console.error("Error adding story:", ex);
      showSnackbar("Error adding stry: " + ex.response.data.message, "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "40vh",
          }}
        >
          <Typography variant="h5" align="center">
            Add to your story
          </Typography>
          {!image ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="20vh"
              mt={4}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ textTransform: "none" }}
              >
                Add image
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </Button>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="80%"
            >
              <img
                style={{ height: "100%", width: "100%", marginTop: "1rem" }}
                src={imageURL}
              />
              <Box ml="auto">
                <IconButton
                  color="primary"
                  aria-label="send-comment"
                  onClick={handleSubmit}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateStoryModal;
