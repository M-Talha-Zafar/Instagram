import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import ImageIcon from "@mui/icons-material/Image";
import ImageCarousel from "../components/utilities/ImageCarousel";
import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";

const CreatePost = () => {
  const { user, refreshUser } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { createPost, creatingPost } = postService();

  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const selectedFiles = event.target.files;
    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/"),
    );

    const base64Promises = imageFiles.map((file) => convertToBase64(file));

    try {
      const base64Images = await Promise.all(base64Promises);
      setImages([...images, ...base64Images]);
    } catch (error) {
      console.error("Error converting images to Base64:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setCurrentIndex(index < updatedImages.length ? index : index - 1);
    setImages(updatedImages);
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

    const postData = {
      images: images,
      caption: caption,
      userId: user._id,
    };

    try {
      const newPost = await createPost(postData);
      showSnackbar("Post made successfully");
      refreshUser();
      navigate(`/post/${newPost._id}`);
    } catch (ex) {
      console.error("Error creating post:", ex);
      showSnackbar("Error signing up: " + ex.response.data.message, "error");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }} p={4}>
            <Box textAlign="center" mt={5}>
              <Typography variant="h2" mb={1}>
                Create a post
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "grey" }}>
                You can share anything that is on your mind here! <br />
                Note: A post can have upto 10 images
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
                images={images}
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
              {creatingPost ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  disabled={images.length > 10}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Create Post
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePost;
