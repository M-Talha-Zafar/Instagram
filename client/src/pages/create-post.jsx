import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { upload } from "../utilities/uploadImage";
import { useSnackbar } from "../contexts/SnackbarContext";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import ImageCarousel from "../components/utilities/ImageCarousel";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { user, refreshUser } = useUserContext();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    let urls = [];
    for (const file of selectedFiles) {
      const imageUrl = URL.createObjectURL(file);
      urls.push(imageUrl);
    }
    setImageURLs([...imageURLs, ...urls]);

    setImages([...images, ...imageFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedURLs = [...imageURLs];

    updatedImages.splice(index, 1);
    updatedURLs.splice(index, 1);

    setCurrentIndex(index < updatedImages.length ? index : index - 1);

    setImages(updatedImages);
    setImageURLs(updatedURLs);
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      showSnackbar("Please upload at least one image", "error");
      return;
    }
    if (images.length > 10) {
      showSnackbar("You can only upload 10 images in one post", "error");
      return;
    }

    const imageLinks = [];

    for (const image of images) {
      try {
        const link = await upload(image);
        imageLinks.push(link);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const postData = {
      images: imageLinks,
      caption: caption,
      userId: user._id,
    };

    const token = localStorage.getItem("user-token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Post made successfully");
      refreshUser();
      navigate(`/post/${response.data._id}`);
    } catch (ex) {
      console.error("Error creating post:", ex);
      showSnackbar("Error signing up: " + ex.response.data.message, "error");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }} p={4}>
            <Box textAlign="center" mt={5}>
              <Typography variant="h3" mb={1}>
                Create a post
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "grey" }}>
                A post can have upto 10 images
              </Typography>
            </Box>
            <TextField
              sx={{ mt: 3, mb: 3 }}
              label="Caption"
              variant="outlined"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              fullWidth
            />
            {images.length > 0 && (
              <ImageCarousel
                images={imageURLs}
                removeImage={handleRemoveImage}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
            {images.length > 10 && (
              <Typography align="center" variant="subtitle1" color="secondary">
                Please make sure only 10 images are selected
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                variant="outlined"
                component="label"
                sx={{ textTransform: "none" }}
              >
                <ImageIcon />
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
              </IconButton>
              <Button
                disabled={images.length > 10}
                variant="contained"
                onClick={handleSubmit}
              >
                Create Post
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePost;
