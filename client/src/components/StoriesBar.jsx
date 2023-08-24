import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ViewStoryModal from "./ViewStoryModal";
import CreateStoryModal from "./CreateStoryModal";

const StoriesBar = ({ user: currentUser }) => {
  const [users, setUsers] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [storyUser, setStoryUser] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  useEffect(() => {
    const fetchStoryUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/stories/${currentUser._id}`
        );

        setUsers([currentUser, ...response.data]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryUsers();
  }, [openCreateModal]);

  const handleStoryClick = (user) => {
    setStoryUser(user);
    handleOpenViewModal();
  };

  const handleAddStory = () => {
    handleOpenCreateModal();
  };

  return (
    <Box sx={{ maxWidth: "40vw " }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ViewStoryModal
          open={openViewModal}
          onClose={handleCloseViewModal}
          user={storyUser}
        />
        <CreateStoryModal
          open={openCreateModal}
          onClose={handleCloseCreateModal}
          user={currentUser}
        />
        <Box>
          <Avatar
            sx={{
              height: "100px",
              width: "100px",
              cursor: "pointer",
              mt: 1,
            }}
            onClick={handleAddStory}
          >
            <AddIcon />
          </Avatar>
          <Typography
            sx={{ cursor: "pointer" }}
            variant="subtitle1"
            align="center"
          >
            Add a story
          </Typography>
        </Box>
        {!isLoading &&
          users
            .filter((user) => user?.stories.length > 0)
            .map((user) => (
              <Box key={user._id} sx={{ margin: "0.5rem" }}>
                <Avatar
                  src={user.profilePicture}
                  sx={{
                    height: "100px",
                    width: "100px",
                    border: "2px solid #E1306C",
                    cursor: "pointer",
                  }}
                  onClick={() => handleStoryClick(user)}
                />
                <Typography
                  onClick={() => {
                    navigate(`/${user.username}`);
                  }}
                  sx={{ cursor: "pointer" }}
                  variant="subtitle1"
                  align="center"
                >
                  <b>{user.username}</b>
                </Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default StoriesBar;
