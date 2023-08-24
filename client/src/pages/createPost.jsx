import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { upload } from "../utilities/uploadImage";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import ImageCarousel from "../components/ImageCarousel";
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        postData
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
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box sx={{ display: "flex", flexDirection: "column" }} p={4}>
          <Typography variant="h4">Create a Post</Typography>
          <Box display="flex" mt={4}>
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none", marginLeft: "auto" }}
            >
              Add image
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
            </Button>
          </Box>
          {images.length > 0 && (
            <ImageCarousel
              images={imageURLs}
              removeImage={handleRemoveImage}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}
          <TextField
            sx={{ mt: 3, mb: 3 }}
            label="Caption"
            variant="outlined"
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
          />
          <Box ml="auto">
            <Button variant="contained" onClick={handleSubmit}>
              Create Post
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;
