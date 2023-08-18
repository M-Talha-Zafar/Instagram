import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState(user);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please select a valid image file.");
      event.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "instagram");

      const cloudinaryUri = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`;

      try {
        const response = await axios.post(cloudinaryUri, formData);

        if (response.status === 200) {
          const imageUrl = response.data.secure_url;
          return imageUrl;
        } else {
          throw new Error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const profilePicture = await handleUpload();
      editedUser.profilePicture = profilePicture;
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`,
        editedUser
      );
      setUser(response.data);
      showSnackbar("Changed have been saved");
      navigate("/user");
    } catch (error) {
      console.error(error);
      showSnackbar("Error updating profile: " + error);
    }
  };

  return (
    <Container maxWidth={"md"}>
      <Paper sx={{ mt: 5 }} elevation={3}>
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h5">Edit Profile</Typography>
          <Divider sx={{ marginY: "1rem" }} />
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Avatar
              src={user.profilePicture}
              sx={{ width: 100, height: 100 }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginLeft: "auto" }}
            >
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </Button>
          </Box>
          <TextField
            name="fullname"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={editedUser.fullname}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={editedUser.username}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            name="bio"
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editedUser.bio}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
